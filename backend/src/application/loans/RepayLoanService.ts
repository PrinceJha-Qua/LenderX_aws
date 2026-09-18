import { LoanRepository, AuditRepository } from '../../domain/repositories';
import { DomainError } from '../../shared/errors';
import { RepaymentRequest } from '../../shared/schemas';
import { Cents } from '../../shared/Money';

export class RepayLoanService {
  constructor(
    private loanRepo: LoanRepository,
    private auditRepo: AuditRepository,
  ) {}

  async execute(req: RepaymentRequest, borrowerId: string): Promise<void> {
    // 1. Fetch Aggregate
    const loan = await this.loanRepo.getById(req.loanId);
    if (!loan) throw new DomainError('Loan not found', 'NOT_FOUND', 404);

    // 2. Authorization
    if (loan.borrowerId !== borrowerId) {
      throw new DomainError('Unauthorized to repay this loan', 'UNAUTHORIZED', 403);
    }

    // 3. Domain Business Rules Check
    loan.repay(req.amount as Cents);

    // 4. Infrastructure Persistence (Atomic Transaction)
    // DynamoDB needs to atomic add to totalRepaid and subtract from remainingBalance
    await this.loanRepo.repayLoanTx(loan, req.idempotencyKey);

    // 5. Audit
    await this.auditRepo.record({
      eventType: loan.remainingBalance === 0 ? 'LOAN_COMPLETED' : 'LOAN_REPAID',
      entityId: loan.id,
      actorId: borrowerId,
      metadata: { amount: req.amount, idempotencyKey: req.idempotencyKey, newStatus: loan.status },
    });
  }
}
