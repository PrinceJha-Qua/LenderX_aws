import { Cents } from '../shared/Money';
import { Loan } from './loan/Loan';

export interface Lender {
  id: string;
  balance: Cents;
}

export interface LenderRepository {
  getById(id: string): Promise<Lender | null>;
}

export interface LoanRepository {
  getById(id: string): Promise<Loan | null>;

  // This must be implemented as a DynamoDB TransactWriteItems call
  // Atomically updates the loan status, deducts lender balance, and records transaction
  fundLoanTx(loan: Loan, lenderId: string, idempotencyKey: string): Promise<void>;

  // Atomically updates loan balances, updates borrower credit level if completed, and records transaction
  repayLoanTx(loan: Loan, idempotencyKey: string): Promise<void>;

  save(loan: Loan): Promise<void>;
}

export interface AuditRepository {
  record(event: {
    eventType: string;
    entityId: string;
    actorId: string;
    metadata: Record<string, any>;
  }): Promise<void>;
}
