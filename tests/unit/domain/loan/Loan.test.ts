import { Loan } from '../../../../backend/src/domain/loan/Loan';
import { LoanStatus } from '../../../../backend/src/domain/loan/LoanStatus';
import {
  InvariantViolationError,
  IllegalStateTransitionError,
} from '../../../../backend/src/shared/errors';
import { Money } from '../../../../backend/src/shared/Money';

describe('Loan Entity', () => {
  it('should progress through a happy path lifecycle correctly', () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });

    expect(loan.status).toBe(LoanStatus.REQUESTED);

    loan.startUnderwriting();
    expect(loan.status).toBe(LoanStatus.UNDERWRITING);

    // Approve loan (limit is $150)
    loan.approve(85, Money.fromDollars(150));
    expect(loan.status).toBe(LoanStatus.APPROVED);

    // Check interest (100 * 0.15 = 15 -> total 115)
    expect(loan.remainingBalance).toBe(Money.fromDollars(115));

    loan.fund('LEND-1');
    expect(loan.status).toBe(LoanStatus.FUNDED);

    loan.disburse();
    expect(loan.status).toBe(LoanStatus.DISBURSED);

    // Partial repayment
    loan.repay(Money.fromDollars(50));
    expect(loan.status).toBe(LoanStatus.REPAYING);
    expect(loan.remainingBalance).toBe(Money.fromDollars(65));

    // Full remaining repayment
    loan.repay(Money.fromDollars(65));
    expect(loan.status).toBe(LoanStatus.COMPLETED);
    expect(loan.remainingBalance).toBe(0);
  });

  it('should prevent borrowing over credit limit', () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(200),
      termDays: 30,
      interestRate: 0.15,
    });

    loan.startUnderwriting();

    // limit is only $150
    expect(() => loan.approve(85, Money.fromDollars(150))).toThrow(InvariantViolationError);
  });

  it('should enforce strict state transitions', () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });

    // Cannot fund before approval
    expect(() => loan.fund('LEND-1')).toThrow(IllegalStateTransitionError);
  });

  it('should prevent borrower from funding own loan', () => {
    const loan = Loan.create({
      loanId: 'L-1',
      borrowerId: 'B-1',
      amount: Money.fromDollars(100),
      termDays: 30,
      interestRate: 0.15,
    });

    loan.startUnderwriting();
    loan.approve(85, Money.fromDollars(150));

    expect(() => loan.fund('B-1')).toThrow(InvariantViolationError);
  });
});
