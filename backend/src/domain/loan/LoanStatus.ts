import { IllegalStateTransitionError } from '../../shared/errors';

export enum LoanStatus {
  REQUESTED = 'REQUESTED',
  UNDERWRITING = 'UNDERWRITING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  FUNDED = 'FUNDED',
  DISBURSED = 'DISBURSED',
  REPAYING = 'REPAYING',
  COMPLETED = 'COMPLETED',
  DEFAULTED = 'DEFAULTED',
}

// Defines ONLY the legal transitions as per Domain Model §2.2
const LegalTransitions: Record<LoanStatus, LoanStatus[]> = {
  [LoanStatus.REQUESTED]: [LoanStatus.UNDERWRITING],
  [LoanStatus.UNDERWRITING]: [LoanStatus.APPROVED, LoanStatus.DENIED],
  [LoanStatus.APPROVED]: [LoanStatus.FUNDED],
  [LoanStatus.FUNDED]: [LoanStatus.DISBURSED],
  [LoanStatus.DISBURSED]: [LoanStatus.REPAYING, LoanStatus.COMPLETED, LoanStatus.DEFAULTED],
  [LoanStatus.REPAYING]: [LoanStatus.REPAYING, LoanStatus.COMPLETED, LoanStatus.DEFAULTED],
  [LoanStatus.DENIED]: [], // Terminal
  [LoanStatus.COMPLETED]: [], // Terminal
  [LoanStatus.DEFAULTED]: [], // Terminal
};

export function assertLegalTransition(current: LoanStatus, next: LoanStatus): void {
  const allowed = LegalTransitions[current];
  if (!allowed.includes(next)) {
    throw new IllegalStateTransitionError(`Cannot transition loan from ${current} to ${next}`);
  }
}

export function isTerminal(status: LoanStatus): boolean {
  return [LoanStatus.DENIED, LoanStatus.COMPLETED, LoanStatus.DEFAULTED].includes(status);
}
