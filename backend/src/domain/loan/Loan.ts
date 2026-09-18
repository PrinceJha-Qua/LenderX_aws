import { LoanStatus, assertLegalTransition } from './LoanStatus';
import { Cents, Money } from '../../shared/Money';
import { InvariantViolationError } from '../../shared/errors';

export interface LoanData {
  loanId: string;
  borrowerId: string;
  lenderId: string | null;
  amount: Cents;
  termDays: number;
  interestRate: number; // e.g. 0.15 for 15%

  status: LoanStatus;

  // Underwriting
  riskScore: number | null;

  // Financial tracking
  totalRepaid: Cents;
  remainingBalance: Cents;

  createdAt: Date;
  dueDate: Date | null;
  fundedAt: Date | null;
  disbursedAt: Date | null;
  completedAt: Date | null;
}

export class Loan {
  private constructor(private data: LoanData) {}

  // ── Factory ──

  static create(props: {
    loanId: string;
    borrowerId: string;
    amount: Cents;
    termDays: number;
    interestRate: number;
    createdAt?: Date;
  }): Loan {
    if (!Money.isValid(props.amount) || props.amount <= 0) {
      throw new InvariantViolationError('Loan amount must be a positive integer in cents');
    }

    return new Loan({
      loanId: props.loanId,
      borrowerId: props.borrowerId,
      lenderId: null,
      amount: props.amount,
      termDays: props.termDays,
      interestRate: props.interestRate,
      status: LoanStatus.REQUESTED,
      riskScore: null,
      totalRepaid: 0 as Cents,
      remainingBalance: 0 as Cents, // balance becomes active after funding/disbursement
      createdAt: props.createdAt || new Date(),
      dueDate: null,
      fundedAt: null,
      disbursedAt: null,
      completedAt: null,
    });
  }

  // Rehydrate from DB
  static fromSnapshot(data: LoanData): Loan {
    return new Loan({ ...data });
  }

  // ── Getters ──

  get id(): string {
    return this.data.loanId;
  }
  get status(): LoanStatus {
    return this.data.status;
  }
  get amount(): Cents {
    return this.data.amount;
  }
  get remainingBalance(): Cents {
    return this.data.remainingBalance;
  }
  get borrowerId(): string {
    return this.data.borrowerId;
  }

  public snapshot(): Readonly<LoanData> {
    return { ...this.data };
  }

  // ── Business Logic / State Transitions ──

  startUnderwriting(): void {
    assertLegalTransition(this.data.status, LoanStatus.UNDERWRITING);
    this.data.status = LoanStatus.UNDERWRITING;
  }

  approve(score: number, creditLimit: Cents): void {
    assertLegalTransition(this.data.status, LoanStatus.APPROVED);

    if (this.data.amount > creditLimit) {
      throw new InvariantViolationError(
        `Loan amount ${this.data.amount} exceeds borrower limit ${creditLimit}`,
      );
    }

    this.data.riskScore = score;
    this.data.status = LoanStatus.APPROVED;

    // Total owed is calculated here
    const interest = Money.calculateInterest(this.data.amount, this.data.interestRate);
    this.data.remainingBalance = (this.data.amount + interest) as Cents;
  }

  deny(score: number): void {
    assertLegalTransition(this.data.status, LoanStatus.DENIED);
    this.data.riskScore = score;
    this.data.status = LoanStatus.DENIED;
  }

  fund(lenderId: string): void {
    assertLegalTransition(this.data.status, LoanStatus.FUNDED);

    if (this.data.borrowerId === lenderId) {
      throw new InvariantViolationError('Borrower cannot fund their own loan');
    }

    this.data.lenderId = lenderId;
    this.data.status = LoanStatus.FUNDED;
    this.data.fundedAt = new Date();
  }

  disburse(timestamp: Date = new Date()): void {
    assertLegalTransition(this.data.status, LoanStatus.DISBURSED);

    this.data.status = LoanStatus.DISBURSED;
    this.data.disbursedAt = timestamp;

    // Set due date to termDays after disbursement
    const due = new Date(timestamp.getTime());
    due.setDate(due.getDate() + this.data.termDays);
    this.data.dueDate = due;
  }

  repay(amountCents: Cents): void {
    if (this.data.status === LoanStatus.DISBURSED) {
      assertLegalTransition(this.data.status, LoanStatus.REPAYING);
      this.data.status = LoanStatus.REPAYING;
    } else {
      assertLegalTransition(this.data.status, LoanStatus.REPAYING);
    }

    if (!Money.isValid(amountCents) || amountCents <= 0) {
      throw new InvariantViolationError('Repayment amount must be > 0');
    }

    if (amountCents > this.data.remainingBalance) {
      throw new InvariantViolationError('Cannot overpay loan');
    }

    this.data.totalRepaid = (this.data.totalRepaid + amountCents) as Cents;
    this.data.remainingBalance = (this.data.remainingBalance - amountCents) as Cents;

    if (this.data.remainingBalance === 0) {
      assertLegalTransition(this.data.status, LoanStatus.COMPLETED);
      this.data.status = LoanStatus.COMPLETED;
      this.data.completedAt = new Date();
    }
  }

  markDefaulted(): void {
    assertLegalTransition(this.data.status, LoanStatus.DEFAULTED);

    if (this.data.remainingBalance === 0) {
      throw new InvariantViolationError('Cannot default a loan with zero balance');
    }

    this.data.status = LoanStatus.DEFAULTED;
  }
}
