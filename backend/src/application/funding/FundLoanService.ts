import { LoanRepository, LenderRepository, AuditRepository } from '../../domain/repositories';
import { DomainError, InsufficientFundsError } from '../../shared/errors';
import { FundLoanRequest } from '../../shared/schemas';

export class FundLoanService {
  constructor(
    private loanRepo: LoanRepository,
    private lenderRepo: LenderRepository,
    private auditRepo: AuditRepository,
  ) {}

  async execute(req: FundLoanRequest): Promise<void> {
    // 1. Fetch Aggregates
    const loan = await this.loanRepo.getById(req.loanId);
    if (!loan) throw new DomainError('Loan not found', 'NOT_FOUND', 404);

    const lender = await this.lenderRepo.getById(req.lenderId);
    if (!lender) throw new DomainError('Lender not found', 'NOT_FOUND', 404);

    // 2. Domain Business Rules Check
    // Loan entity defends its own state machine (must be APPROVED, can't be own loan)
    loan.fund(lender.id);

    // FUNDED -> DISBURSED
    // For LenderX MVP, funding means immediate disbursement.
    loan.disburse();

    // Cross-aggregate rule: Lender must have enough money
    if (lender.balance < loan.amount) {
      throw new InsufficientFundsError(
        `Lender balance ${lender.balance} is less than loan amount ${loan.amount}`,
      );
    }

    // 3. Infrastructure Persistence (Atomic Transaction)
    // Passes the idempotency key down to DynamoDB
    await this.loanRepo.fundLoanTx(loan, lender.id, req.idempotencyKey);

    // 4. Observability / Audit
    await this.auditRepo.record({
      eventType: 'LOAN_FUNDED',
      entityId: loan.id,
      actorId: lender.id,
      metadata: { amount: loan.amount, idempotencyKey: req.idempotencyKey },
    });
  }
}
