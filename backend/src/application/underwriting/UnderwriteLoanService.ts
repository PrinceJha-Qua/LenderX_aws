import { LoanRepository } from '../../domain/repositories';
import { DomainError } from '../../shared/errors';
import { DocumentTextExtractor } from '../../infrastructure/ai/TextractService';
import { FeatureExtractor } from '../../infrastructure/ai/BedrockService';
import { ScoringEngine, APPROVAL_THRESHOLD } from '../../domain/underwriting/ScoringEngine';
import { getCreditLimit } from '../../domain/credit/CreditLadder';

export interface BorrowerLevelProvider {
  getLevel(borrowerId: string): Promise<number>;
}

export class UnderwriteLoanService {
  constructor(
    private loanRepo: LoanRepository,
    private borrowerProvider: BorrowerLevelProvider,
    private textExtractor: DocumentTextExtractor,
    private featureExtractor: FeatureExtractor,
  ) {}

  async execute(loanId: string, documentBucket: string, documentKey: string): Promise<void> {
    // 1. Fetch Loan Aggregate
    const loan = await this.loanRepo.getById(loanId);
    if (!loan) throw new DomainError('Loan not found', 'NOT_FOUND', 404);

    // Ensure it's in the correct state to be underwritten
    loan.startUnderwriting();
    await this.loanRepo.save(loan);

    // 2. Extract text from AWS Textract
    const rawText = await this.textExtractor.extractText(documentBucket, documentKey);
    if (!rawText || rawText.trim().length === 0) {
      loan.deny(0); // Auto-deny on unreadable docs
      await this.loanRepo.save(loan);
      throw new DomainError('Document is empty or unreadable', 'UNREADABLE_DOC', 422);
    }

    // 3. Extract JSON Features using AWS Bedrock
    const features = await this.featureExtractor.extractFeatures(rawText);

    // 4. Deterministic Scoring
    const score = ScoringEngine.score(features);

    // 5. Check Credit Limit based on Borrower Level
    const borrowerLevel = await this.borrowerProvider.getLevel(loan.borrowerId);
    const limit = getCreditLimit(borrowerLevel);

    // 6. Approve or Deny
    if (score >= APPROVAL_THRESHOLD && loan.amount <= limit) {
      loan.approve(score, limit);
    } else {
      loan.deny(score);
    }

    // 7. Persist final decision
    await this.loanRepo.save(loan);
  }
  async executeMock(loanId: string): Promise<void> {
  const loan = await this.loanRepo.getById(loanId);

  if (!loan) {
    throw new DomainError('Loan not found', 'NOT_FOUND', 404);
  }

  // REQUESTED -> UNDERWRITING
  loan.startUnderwriting();
  await this.loanRepo.save(loan);

  // Mock borrower information
  const borrowerLevel = await this.borrowerProvider.getLevel(loan.borrowerId);
  const limit = getCreditLimit(borrowerLevel);

  // Temporary deterministic score while Bedrock is unavailable
  const mockRiskScore = 85;

  // UNDERWRITING -> APPROVED
  loan.approve(mockRiskScore, limit);

  await this.loanRepo.save(loan);
}
}
