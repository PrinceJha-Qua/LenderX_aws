import {
  UnderwriteLoanService,
  BorrowerLevelProvider,
} from '../../../../backend/src/application/underwriting/UnderwriteLoanService';
import { LoanRepository } from '../../../../backend/src/domain/repositories';
import { DocumentTextExtractor } from '../../../../backend/src/infrastructure/ai/TextractService';
import { FeatureExtractor } from '../../../../backend/src/infrastructure/ai/BedrockService';
import { Loan } from '../../../../backend/src/domain/loan/Loan';
import { LoanStatus } from '../../../../backend/src/domain/loan/LoanStatus';
import { Money } from '../../../../backend/src/shared/Money';
import { UnderwritingFeatures } from '../../../../backend/src/domain/underwriting/ScoringEngine';

describe('UnderwriteLoanService', () => {
  let mockLoanRepo: jest.Mocked<LoanRepository>;
  let mockBorrowerProvider: jest.Mocked<BorrowerLevelProvider>;
  let mockTextExtractor: jest.Mocked<DocumentTextExtractor>;
  let mockFeatureExtractor: jest.Mocked<FeatureExtractor>;
  let service: UnderwriteLoanService;

  beforeEach(() => {
    mockLoanRepo = {
      getById: jest.fn(),
      fundLoanTx: jest.fn(),
      repayLoanTx: jest.fn(),
      save: jest.fn(),
    };
    mockBorrowerProvider = { getLevel: jest.fn() };
    mockTextExtractor = { extractText: jest.fn() };
    mockFeatureExtractor = { extractFeatures: jest.fn() };

    service = new UnderwriteLoanService(
      mockLoanRepo,
      mockBorrowerProvider,
      mockTextExtractor,
      mockFeatureExtractor,
    );
  });

  it('approves a loan if doc is valid, features are good, and amount is within limit', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });

    mockLoanRepo.getById.mockResolvedValue(loan);
    mockTextExtractor.extractText.mockResolvedValue('Valid business ledger text...');

    // Perfect features that will score > 90
    const perfectFeatures: UnderwritingFeatures = {
      monthlyRevenue: 6000,
      revenueVolatility: 0.05,
      transactionCount: 600,
      previousLoans: 12,
      previousDefaults: 0,
      debtToIncome: 0.1,
      cashFlowScore: 95,
    };
    mockFeatureExtractor.extractFeatures.mockResolvedValue(perfectFeatures);
    mockBorrowerProvider.getLevel.mockResolvedValue(2); // Level 2 limit is $150

    await service.execute('L-1', 'test-bucket', 'doc.pdf');

    expect(loan.status).toBe(LoanStatus.APPROVED);
    // 2 times: once for startUnderwriting, once for approve
    expect(mockLoanRepo.save).toHaveBeenCalledTimes(2);
  });

  it('denies a loan if AI scoring fails to reach the threshold', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });

    mockLoanRepo.getById.mockResolvedValue(loan);
    mockTextExtractor.extractText.mockResolvedValue('Poor business ledger text...');

    // Terrible features that will score very low
    const badFeatures: UnderwritingFeatures = {
      monthlyRevenue: 100,
      revenueVolatility: 0.9,
      transactionCount: 5,
      previousLoans: 1,
      previousDefaults: 1,
      debtToIncome: 0.9,
      cashFlowScore: 10,
    };
    mockFeatureExtractor.extractFeatures.mockResolvedValue(badFeatures);
    mockBorrowerProvider.getLevel.mockResolvedValue(2);

    await service.execute('L-1', 'test-bucket', 'doc.pdf');

    expect(loan.status).toBe(LoanStatus.DENIED);
  });

  it('denies a loan if text extraction yields empty result (unreadable doc)', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    mockLoanRepo.getById.mockResolvedValue(loan);

    // Empty text
    mockTextExtractor.extractText.mockResolvedValue('');

    await expect(service.execute('L-1', 'test-bucket', 'doc.pdf')).rejects.toThrow(
      'Document is empty or unreadable',
    );
    expect(loan.status).toBe(LoanStatus.DENIED);
  });
});
