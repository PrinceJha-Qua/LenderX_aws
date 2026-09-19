import { CheckLoanDefaultService } from '../../../../backend/src/application/lifecycle/CheckLoanDefaultService';
import { LoanRepository, AuditRepository } from '../../../../backend/src/domain/repositories';
import { BorrowerRepository } from '../../../../backend/src/application/loans/CreateLoanService';
import { Loan } from '../../../../backend/src/domain/loan/Loan';
import { Money } from '../../../../backend/src/shared/Money';
import { LoanStatus } from '../../../../backend/src/domain/loan/LoanStatus';

describe('CheckLoanDefaultService', () => {
  let mockLoanRepo: jest.Mocked<LoanRepository>;
  let mockBorrowerRepo: jest.Mocked<BorrowerRepository>;
  let mockAuditRepo: jest.Mocked<AuditRepository>;
  let service: CheckLoanDefaultService;

  beforeEach(() => {
    mockLoanRepo = {
      getById: jest.fn(),
      fundLoanTx: jest.fn(),
      repayLoanTx: jest.fn(),
      save: jest.fn(),
    };
    mockBorrowerRepo = { getLevel: jest.fn(), getActiveLoanCount: jest.fn() };
    mockAuditRepo = { record: jest.fn() };

    service = new CheckLoanDefaultService(mockLoanRepo, mockBorrowerRepo, mockAuditRepo);
  });

  it('marks a past-due loan as defaulted and audits it', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    loan.startUnderwriting();
    loan.approve(80, Money.fromDollars(500));
    loan.fund('LEND-1');

    // Disbursed 31 days ago
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 31);
    loan.disburse(pastDate);

    mockLoanRepo.getById.mockResolvedValue(loan);
    mockBorrowerRepo.getLevel.mockResolvedValue(4);

    await service.execute('L-1');

    expect(loan.status).toBe(LoanStatus.DEFAULTED);
    expect(mockLoanRepo.save).toHaveBeenCalledWith(loan);
    expect(mockAuditRepo.record).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: 'LOAN_DEFAULTED' }),
    );
  });

  it('does nothing if the loan is not yet due', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    loan.startUnderwriting();
    loan.approve(80, Money.fromDollars(500));
    loan.fund('LEND-1');

    // Disbursed today (due in 30 days)
    loan.disburse(new Date());

    mockLoanRepo.getById.mockResolvedValue(loan);

    await service.execute('L-1');

    // Status remains unchanged
    expect(loan.status).toBe(LoanStatus.DISBURSED);
    expect(mockLoanRepo.save).not.toHaveBeenCalled();
  });
});
