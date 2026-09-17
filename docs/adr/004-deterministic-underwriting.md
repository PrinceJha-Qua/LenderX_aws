# ADR-004: Deterministic Underwriting Over LLM Decisions

**Date:** 2026-09-17
**Status:** Accepted

## Context
Credit decisions have real consequences. We need a defensible, auditable, explainable system for deciding whether a borrower is eligible for a loan and at what terms.

## Decision
The credit decision is made by a deterministic scoring engine with transparent, auditable rules. The LLM (Bedrock) is used ONLY for data extraction, never for the decision itself.

## The Scoring Algorithm

### Feature Weights
```
monthlyRevenue      weight: 0.20  (higher revenue → higher score)
revenueVolatility   weight: 0.15  (lower volatility → higher score, inverted)
transactionCount    weight: 0.10  (more transactions → higher score)
previousLoans       weight: 0.10  (more completed loans → higher score)
previousDefaults    weight: 0.20  (any defaults → significant penalty, inverted)
debtToIncome        weight: 0.10  (lower DTI → higher score, inverted)
cashFlowScore       weight: 0.15  (higher → higher score)
```

### Normalization
Each feature is normalized to [0, 1] before weighting:
```
normalizedRevenue = min(monthlyRevenue / 500000, 1.0)         // $5,000/mo = max
normalizedVolatility = max(1.0 - revenueVolatility, 0)        // inverted
normalizedTxCount = min(transactionCount / 500, 1.0)           // 500 txns = max
normalizedLoans = min(previousLoans / 10, 1.0)                 // 10 loans = max
normalizedDefaults = max(1.0 - (previousDefaults * 0.5), 0)   // heavy penalty
normalizedDTI = max(1.0 - debtToIncome, 0)                    // inverted
normalizedCashFlow = cashFlowScore / 100                       // already 0-100
```

### Score Calculation
```
rawScore = sum(normalized[i] * weight[i]) for all features
riskScore = round(rawScore * 100)  // 0-100
```

### Decision Rules
```
APPROVAL_THRESHOLD = 60

IF riskScore >= APPROVAL_THRESHOLD
   AND amount <= borrower.creditLimit
   AND borrower.activeLoans == 0
   AND borrower.identity == VERIFIED
THEN → APPROVED

ELSE → DENIED with specific reason(s)
```

## Why Deterministic
- **Auditable.** We can explain exactly why a score is 73 vs 82.
- **Reproducible.** Same inputs always produce the same score.
- **Testable.** We can write unit tests with exact expected outputs.
- **Defensible.** When a judge asks "how do you decide?", we show the formula, not "the AI said so."
- **Fair.** No model bias, no hallucinated credit decisions.

## Consequences
- The algorithm is simplistic compared to real credit models. That's fine — we're demonstrating the architecture, not competing with Experian.
- Weights are manually tuned, not ML-optimized. We can explain each weight.
- The threshold (60) is a system constant, documented and testable.
