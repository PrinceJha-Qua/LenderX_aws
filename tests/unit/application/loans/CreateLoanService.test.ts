import {
  CreateLoanService,
  BorrowerRepository,
} from '../../../../backend/src/application/loans/CreateLoanService';
import { LoanRepository } from '../../../../backend/src/domain/repositories';
import { DomainError } from '../../../../backend/src/shared/errors';

describe('CreateLoanService', () => {
  let mockLoanRepo: jest.Mocked<LoanRepository>;
  let mockBorrowerRepo: jest.Mocked<BorrowerRepository>;
  let service: CreateLoanService;

  beforeEach(() => {
    mockLoanRepo = {
      getById: jest.fn(),
      fundLoanTx: jest.fn(),
      repayLoanTx: jest.fn(),
      save: jest.fn(),
    };
    mockBorrowerRepo = {
      getLevel: jest.fn(),
      getActiveLoanCount: jest.fn(),
    };

    service = new CreateLoanService(mockLoanRepo, mockBorrowerRepo);
  });

  it('creates a loan successfully for a level 1 borrower', async () => {
    mockBorrowerRepo.getActiveLoanCount.mockResolvedValue(0);
    mockBorrowerRepo.getLevel.mockResolvedValue(1);

    const loan = await service.execute(
      {
        amount: 4000, // $40.00 (within $50 limit)
        termDays: 30,
        purpose: 'Inventory',
      },
      'B-1',
    );

    expect(loan.borrowerId).toBe('B-1');
    expect(loan.amount).toBe(4000);
    expect(mockLoanRepo.save).toHaveBeenCalledWith(loan);
  });

  it('rejects if borrower has an active loan', async () => {
    mockBorrowerRepo.getActiveLoanCount.mockResolvedValue(1);

    await expect(
      service.execute({ amount: 1000, termDays: 30, purpose: 'Test' }, 'B-1'),
    ).rejects.toThrow(DomainError);
  });

  it('rejects if amount exceeds credit limit', async () => {
    mockBorrowerRepo.getActiveLoanCount.mockResolvedValue(0);
    mockBorrowerRepo.getLevel.mockResolvedValue(1); // Limit is $50 (5000 cents)

    await expect(
      service.execute({ amount: 6000, termDays: 30, purpose: 'Too much' }, 'B-1'),
    ).rejects.toThrow(DomainError);
  });
});
