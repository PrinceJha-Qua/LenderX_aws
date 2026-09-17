# ADR-006: Money as Integer Cents

**Date:** 2026-09-17
**Status:** Accepted

## Context
LenderX is a financial application. How we represent, store, and compute monetary values is a fundamental design choice that affects correctness.

## Decision
All monetary values are represented as **non-negative integers in cents** (1/100 of a dollar). No floating-point money. Ever.

## Why
JavaScript's `Number` type is IEEE 754 double-precision floating point:
```javascript
0.1 + 0.2 === 0.30000000000000004  // true
```

In a lending application, this means:
```javascript
// WRONG: floating point
const balance = 100.00;
const payment = 33.33;
const remaining = balance - payment - payment - payment;
// remaining = 0.010000000000005116 (not zero!)
```

```javascript
// CORRECT: integer cents
const balance = 10000;  // $100.00
const payment = 3333;   // $33.33
const remaining = balance - payment - payment - payment;
// remaining = 1 (one cent — correct!)
```

## Alternatives Considered
1. **Decimal.js library** — Arbitrary precision, but adds a dependency and DynamoDB stores numbers natively as IEEE 754.
2. **String representation** — Store "$50.00" as string, parse on use. Error-prone, no arithmetic.
3. **Integer cents** — Simple, correct, fast, no dependencies.

## Consequences
- All API inputs/outputs must convert: display = cents / 100, store = dollars * 100
- DynamoDB stores as Number (which is fine — integers up to 2^53 are exact in double precision)
- Interest calculation uses `Math.floor` to avoid fractional cents
- Frontend formats with `toFixed(2)` for display only
- A `Money` type brand prevents accidentally mixing cents and dollars at the type level

## Rules
```
1. NEVER store money as a float
2. NEVER do arithmetic on displayed dollar amounts
3. ALWAYS validate money inputs are positive integers
4. ALWAYS use Math.floor for interest/division (borrower-favorable rounding)
5. MAX value: 50,000,000 cents ($500,000) — system bound for sanity
```
