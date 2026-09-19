import { LoanRepository, AuditRepository } from '../../domain/repositories';
import { BorrowerRepository } from '../../application/loans/CreateLoanService';
import { LoanStatus } from '../../domain/loan/LoanStatus';
import { calculateNewLevel } from '../../domain/credit/CreditLadder';

export class CheckLoanDefaultService {
  constructor(
    private loanRepo: LoanRepository,
    private borrowerRepo: BorrowerRepository,
    private auditRepo: AuditRepository,
  ) {}

  async execute(loanId: string): Promise<void> {
    const loan = await this.loanRepo.getById(loanId);

    // If loan doesn't exist or is already terminal, we have nothing to do
    if (!loan || loan.status === LoanStatus.COMPLETED || loan.status === LoanStatus.DEFAULTED) {
      return;
    }

    const data = loan.snapshot();

    // Check if the loan is active and past due
    if (data.status === LoanStatus.DISBURSED || data.status === LoanStatus.REPAYING) {
      if (data.dueDate && new Date() >= data.dueDate) {
        // 1. Mark the loan as defaulted
        loan.markDefaulted();
        await this.loanRepo.save(loan);

        // 2. Penalize the borrower's credit ladder
        const currentLevel = await this.borrowerRepo.getLevel(loan.borrowerId);
        // Note: active loan count/repayments logic in a real system would be tracked in a stats table.
        // For the prototype, we assume successfulRepayments = 0 when defaulting for simplicity of calculation.
        const newLevel = calculateNewLevel(currentLevel, 0, true);

        // We'd save the new level here (assuming a saveLevel method exists in the full repo)
        // await this.borrowerRepo.saveLevel(loan.borrowerId, newLevel);

        // 3. Audit trail
        await this.auditRepo.record({
          eventType: 'LOAN_DEFAULTED',
          entityId: loan.id,
          actorId: 'SYSTEM_LIFECYCLE',
          metadata: {
            remainingBalance: loan.remainingBalance,
            oldLevel: currentLevel,
            newLevel: newLevel,
          },
        });
      }
    }
  }
}
