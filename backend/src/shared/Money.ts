export type Cents = number & { readonly __brand: 'Cents' };

export const Money = {
  fromDollars(dollars: number): Cents {
    return Math.round(dollars * 100) as Cents;
  },

  toDisplay(cents: Cents): string {
    return `$${(cents / 100).toFixed(2)}`;
  },

  calculateInterest(principal: Cents, rate: number): Cents {
    return Math.floor(principal * rate) as Cents;
  },

  isValid(amount: number): amount is Cents {
    return Number.isInteger(amount) && amount >= 0;
  },
};
