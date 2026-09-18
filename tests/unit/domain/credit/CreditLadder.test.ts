import { calculateNewLevel, getCreditLimit, MIN_CREDIT_LEVEL, MAX_CREDIT_LEVEL } from '../../../../backend/src/domain/credit/CreditLadder';

describe('CreditLadder', () => {
  describe('calculateNewLevel', () => {
    it('should drop 2 levels on default', () => {
      expect(calculateNewLevel(5, 5, true)).toBe(3);
    });

    it('should not drop below MIN_CREDIT_LEVEL on default', () => {
      expect(calculateNewLevel(2, 1, true)).toBe(1);
      expect(calculateNewLevel(1, 0, true)).toBe(1);
    });

    it('should level up when threshold is met', () => {
      // Level 1 -> 2 requires 1 repayment
      expect(calculateNewLevel(1, 1, false)).toBe(2);
    });

    it('should jump multiple levels if they have enough cumulative repayments', () => {
      // Level 1, but they somehow have 3 successful repayments (should jump to level 4)
      expect(calculateNewLevel(1, 3, false)).toBe(4);
    });

    it('should cap at MAX_CREDIT_LEVEL', () => {
      expect(calculateNewLevel(7, 20, false)).toBe(7);
    });
  });

  describe('getCreditLimit', () => {
    it('should return correct cents for level 1 ($50)', () => {
      expect(getCreditLimit(1)).toBe(5000); // 5000 cents
    });

    it('should enforce MIN and MAX bounds', () => {
      expect(getCreditLimit(0)).toBe(5000); // Defaults to Level 1 limit
      expect(getCreditLimit(99)).toBe(500000); // Defaults to Level 7 limit ($5000)
    });
  });
});
