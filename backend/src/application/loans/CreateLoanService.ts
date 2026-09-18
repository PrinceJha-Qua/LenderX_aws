import { LoanRepository } from '../../domain/repositories';
import { Loan } from '../../domain/loan/Loan';
import { Cents } from '../../shared/Money';
import { CreateLoanRequest } from '../../shared/schemas';
import { DomainError } from '../../shared/errors';
import { getCreditLimit } from '../../domain/credit/CreditLadder';

// In a real system, borrower level is fetched from DB. We mock it for the prototype service.
export interface BorrowerRepository {
  getLevel(borrowerId: string): Promise<number>;
  getActiveLoanCount(borrowerId: string): Promise<number>;
}

export class CreateLoanService {
  constructor(
    private loanRepo: LoanRepository,
    private borrowerRepo: BorrowerRepository,
  ) {}

  async execute(req: CreateLoanRequest, borrowerId: string): Promise<Loan> {
    // 1. Check active loans (Domain invariant: Max 1 active loan)
    const activeCount = await this.borrowerRepo.getActiveLoanCount(borrowerId);
    if (activeCount > 0) {
      throw new DomainError(
        'Borrower already has an active loan',
        'MAX_ACTIVE_LOANS_EXCEEDED',
        409,
      );
    }

    // 2. Check credit limit early (though it will be checked again at approval)
    const level = await this.borrowerRepo.getLevel(borrowerId);
    const limit = getCreditLimit(level);

    // We strictly use integer cents
    const amountCents = req.amount as Cents;

    if (amountCents > limit) {
      throw new DomainError(
        `Requested amount ${amountCents} exceeds limit ${limit} for level ${level}`,
        'LIMIT_EXCEEDED',
        400,
      );
    }

    // 3. Create Loan Entity
    const loan = Loan.create({
      loanId: `L-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Simple ID generation for hackathon
      borrowerId,
      amount: amountCents,
      termDays: req.termDays,
      interestRate: 0.15, // Fixed 15% rate for the prototype
    });

    // 4. Save to DB
    await this.loanRepo.save(loan);

    return loan;
  }
}
