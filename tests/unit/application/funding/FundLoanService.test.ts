import { FundLoanService } from '../../../../backend/src/application/funding/FundLoanService';
import { Loan } from '../../../../backend/src/domain/loan/Loan';
import { Money } from '../../../../backend/src/shared/Money';
import {
  LoanRepository,
  LenderRepository,
  AuditRepository,
  Lender,
} from '../../../../backend/src/domain/repositories';
import {
  InsufficientFundsError,
  IllegalStateTransitionError,
} from '../../../../backend/src/shared/errors';
// generate a test key without external module issues
const generateId = () => Math.random().toString(36).substring(7);

describe('FundLoanService', () => {
  let mockLoanRepo: jest.Mocked<LoanRepository>;
  let mockLenderRepo: jest.Mocked<LenderRepository>;
  let mockAuditRepo: jest.Mocked<AuditRepository>;
  let service: FundLoanService;

  beforeEach(() => {
    mockLoanRepo = {
      getById: jest.fn(),
      fundLoanTx: jest.fn(),
      repayLoanTx: jest.fn(),
      save: jest.fn(),
    };
    mockLenderRepo = {
      getById: jest.fn(),
    };
    mockAuditRepo = {
      record: jest.fn(),
    };

    service = new FundLoanService(mockLoanRepo, mockLenderRepo, mockAuditRepo);
  });

  it('successfully funds a loan when rules are met', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    // Fast-forward state to APPROVED
    loan.startUnderwriting();
    loan.approve(80, Money.fromDollars(500));

    const lender: Lender = { id: 'LEND-1', balance: Money.fromDollars(200) };

    mockLoanRepo.getById.mockResolvedValue(loan);
    mockLenderRepo.getById.mockResolvedValue(lender);

    const idempotencyKey = generateId();
    await service.execute({ loanId: 'L-1', idempotencyKey }, 'LEND-1');

    // Ensure the transaction was called
    expect(mockLoanRepo.fundLoanTx).toHaveBeenCalledWith(loan, 'LEND-1', idempotencyKey);
    // Ensure audit log fired
    expect(mockAuditRepo.record).toHaveBeenCalled();
  });

  it('rejects if lender has insufficient funds', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(500),
      termDays: 30,
      interestRate: 0.15,
    });
    loan.startUnderwriting();
    loan.approve(80, Money.fromDollars(1000));

    // Lender only has $200, loan is $500
    const lender: Lender = { id: 'LEND-1', balance: Money.fromDollars(200) };

    mockLoanRepo.getById.mockResolvedValue(loan);
    mockLenderRepo.getById.mockResolvedValue(lender);

    await expect(
      service.execute({ loanId: 'L-1', idempotencyKey: generateId() }, 'LEND-1'),
    ).rejects.toThrow(InsufficientFundsError);
  });

  it('rejects if loan is not in APPROVED state', async () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });
    // Loan is in REQUESTED state, not APPROVED

    const lender: Lender = { id: 'LEND-1', balance: Money.fromDollars(200) };

    mockLoanRepo.getById.mockResolvedValue(loan);
    mockLenderRepo.getById.mockResolvedValue(lender);

    await expect(
      service.execute({ loanId: 'L-1', idempotencyKey: generateId() }, 'LEND-1'),
    ).rejects.toThrow(IllegalStateTransitionError);
  });
});
