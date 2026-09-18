import { ScoringEngine, APPROVAL_THRESHOLD } from '../../../../backend/src/domain/underwriting/ScoringEngine';
import { UnderwritingFailureError } from '../../../../backend/src/shared/errors';

describe('ScoringEngine', () => {
  it('should score a perfect borrower highly', () => {
    const score = ScoringEngine.score({
      monthlyRevenue: 6000, // Maxes out
      revenueVolatility: 0.05, // Very stable
      transactionCount: 600, // Maxes out
      previousLoans: 12, // Maxes out
      previousDefaults: 0, // Perfect
      debtToIncome: 0.10, // Excellent
      cashFlowScore: 95, // Excellent
    });
    
    expect(score).toBeGreaterThan(90);
    expect(score).toBeGreaterThanOrEqual(APPROVAL_THRESHOLD);
  });

  it('should heavily penalize defaults', () => {
    const score = ScoringEngine.score({
      monthlyRevenue: 5000,
      revenueVolatility: 0.1,
      transactionCount: 500,
      previousLoans: 5,
      previousDefaults: 2, // 2 defaults wipes out the 0.20 weight entirely
      debtToIncome: 0.20,
      cashFlowScore: 80,
    });
    
    // They lose 20 points off the top, plus some fractional points elsewhere
    expect(score).toBeLessThan(80);
  });

  it('should throw if defaults exceed loans', () => {
    expect(() => {
      ScoringEngine.score({
        monthlyRevenue: 1000,
        revenueVolatility: 0.5,
        transactionCount: 50,
        previousLoans: 1,
        previousDefaults: 2, // Impossible state
        debtToIncome: 0.5,
        cashFlowScore: 50,
      });
    }).toThrow(UnderwritingFailureError);
  });
});
