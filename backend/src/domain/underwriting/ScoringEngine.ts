import { UnderwritingFailureError } from '../../shared/errors';

export interface UnderwritingFeatures {
  monthlyRevenue: number;
  revenueVolatility: number;
  transactionCount: number;
  previousLoans: number;
  previousDefaults: number;
  debtToIncome: number;
  cashFlowScore: number;
}

// Domain Model §4.5
export const APPROVAL_THRESHOLD = 60;

export class ScoringEngine {
  static score(features: UnderwritingFeatures): number {
    // Sanity check business invariants
    if (features.previousDefaults > features.previousLoans) {
      throw new UnderwritingFailureError('Previous defaults cannot exceed previous loans');
    }
    
    // Weights as per ADR-004
    const weights = {
      monthlyRevenue: 0.20,
      revenueVolatility: 0.15,
      transactionCount: 0.10,
      previousLoans: 0.10,
      previousDefaults: 0.20,
      debtToIncome: 0.10,
      cashFlowScore: 0.15,
    };

    // Normalization to [0, 1] range
    // Assuming 5000 as max revenue for the prototype scaling
    const nRev = Math.min(features.monthlyRevenue / 5000, 1.0); 
    const nVol = Math.max(1.0 - features.revenueVolatility, 0); // Inverted: lower volatility is better
    const nTx = Math.min(features.transactionCount / 500, 1.0);
    const nLoans = Math.min(features.previousLoans / 10, 1.0);
    const nDefaults = Math.max(1.0 - (features.previousDefaults * 0.5), 0); // Heavy penalty
    const nDti = Math.max(1.0 - features.debtToIncome, 0); // Inverted: lower DTI is better
    const nCf = Math.max(0, Math.min(features.cashFlowScore / 100, 1.0));

    const rawScore = (
      nRev * weights.monthlyRevenue +
      nVol * weights.revenueVolatility +
      nTx * weights.transactionCount +
      nLoans * weights.previousLoans +
      nDefaults * weights.previousDefaults +
      nDti * weights.debtToIncome +
      nCf * weights.cashFlowScore
    );

    return Math.round(rawScore * 100);
  }
}
