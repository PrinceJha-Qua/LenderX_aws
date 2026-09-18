import { Cents, Money } from '../../shared/Money';

export const MAX_CREDIT_LEVEL = 7;
export const MIN_CREDIT_LEVEL = 1;

// Domain Model §3.1
export const CreditLimits: Record<number, Cents> = {
  1: Money.fromDollars(50),
  2: Money.fromDollars(150),
  3: Money.fromDollars(350),
  4: Money.fromDollars(750),
  5: Money.fromDollars(1500),
  6: Money.fromDollars(3000),
  7: Money.fromDollars(5000),
};

export const UnlockThresholds: Record<number, number> = {
  2: 1, 
  3: 2, 
  4: 3, 
  5: 5, 
  6: 8, 
  7: 12
};

export function getCreditLimit(level: number): Cents {
  const l = Math.max(MIN_CREDIT_LEVEL, Math.min(level, MAX_CREDIT_LEVEL));
  return CreditLimits[l];
}

export function calculateNewLevel(currentLevel: number, totalSuccessfulRepayments: number, hasDefaulted: boolean): number {
  if (hasDefaulted) {
    // Drop 2 levels on default
    return Math.max(currentLevel - 2, MIN_CREDIT_LEVEL);
  }
  
  let nextLevel = currentLevel;
  // Can jump multiple levels if they somehow accumulated many successful repayments
  while (nextLevel < MAX_CREDIT_LEVEL && totalSuccessfulRepayments >= UnlockThresholds[nextLevel + 1]) {
    nextLevel++;
  }
  
  return nextLevel;
}
