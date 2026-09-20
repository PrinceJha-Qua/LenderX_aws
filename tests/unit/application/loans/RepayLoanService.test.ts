import { RepayLoanService } from '../../../../backend/src/application/loans/RepayLoanService';
import { LoanRepository, AuditRepository } from '../../../../backend/src/domain/repositories';
import { Loan } from '../../../../backend/src/domain/loan/Loan';
import { Money } from '../../../../backend/src/shared/Money';
import { LoanStatus } from '../../../../backend/src/domain/loan/LoanStatus';

const generateId = () => Math.random().toString(36).substring(7);

describe('RepayLoanService', () => {
  let mockLoanRepo: jest.Mocked<LoanRepository>;
  let mockAuditRepo: jest.Mocked<AuditRepository>;
  let service: RepayLoanService;

  beforeEach(() => {
    mockLoanRepo = {
      getById: jest.fn(),
      fundLoanTx: jest.fn(),
      repayLoanTx: jest.fn(),
      save: jest.fn(),
    };
    mockAuditRepo = {
      record: jest.fn(),
    };
    service = new RepayLoanService(mockLoanRepo, mockAuditRepo);
  });

  it('successfully processes a partial repayment', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    // Fast forward to disbursed
    loan.startUnderwriting();
    loan.approve(80, Money.fromDollars(500));
    loan.fund('LEND-1');
    loan.disburse();

    mockLoanRepo.getById.mockResolvedValue(loan);

    const idempotencyKey = generateId();
    await service.execute({ loanId: 'L-1', amount: Money.fromDollars(50), idempotencyKey }, 'B-1');

    expect(loan.remainingBalance).toBe(Money.fromDollars(65)); // 115 - 50
    expect(loan.status).toBe(LoanStatus.REPAYING);
    expect(mockLoanRepo.repayLoanTx).toHaveBeenCalledWith(loan, idempotencyKey);
    expect(mockAuditRepo.record).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: 'LOAN_REPAID' }),
    );
  });

  it('completes the loan when fully repaid', async () => {
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
    loan.disburse();

    mockLoanRepo.getById.mockResolvedValue(loan);

    await service.execute(
      { loanId: 'L-1', amount: Money.fromDollars(115), idempotencyKey: generateId() },
      'B-1',
    );

    expect(loan.remainingBalance).toBe(0);
    expect(loan.status).toBe(LoanStatus.COMPLETED);
    expect(mockAuditRepo.record).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: 'LOAN_COMPLETED' }),
    );
  });

  it('rejects repayment of another borrower\'s loan', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    mockLoanRepo.getById.mockResolvedValue(loan);

    await expect(
      service.execute(
        { loanId: 'L-1', amount: Money.fromDollars(50), idempotencyKey: generateId() },
        'B-2',
      ),
    ).rejects.toMatchObject({ statusCode: 403, code: 'UNAUTHORIZED' });
    expect(mockLoanRepo.repayLoanTx).not.toHaveBeenCalled();
  });
});
