# LenderX — Domain Model

> **This document is the source of truth for business behavior.**
> Every implementation decision, every test assertion, every state transition
> must be traceable back to something defined here.

---

## 1. Entity Hierarchy

```
User (abstract)
 ├── Lender
 │    ├── Balance            (available capital, in cents)
 │    ├── Investments[]      (funded loans)
 │    └── Portfolio           (aggregate stats)
 │
 └── Borrower
      ├── CreditProfile
      │    ├── level          (1–7)
      │    ├── limit          (derived from level)
      │    └── history[]      (CreditEvent[])
      ├── BusinessProfile
      │    ├── name
      │    ├── type
      │    └── country
      ├── Documents[]
      └── Loans[]

Loan
 ├── Identity
 │    ├── loanId             (immutable after creation)
 │    ├── borrowerId         (immutable after creation)
 │    └── lenderId           (null until funded, immutable after funding)
 ├── Terms
 │    ├── amount             (in cents, immutable after creation)
 │    ├── termDays           (immutable after creation)
 │    ├── interestRate       (immutable after creation)
 │    └── totalOwed          (amount + interest, computed)
 ├── Purpose
 │    ├── description
 │    ├── vendorName
 │    ├── vendorId
 │    └── invoiceUrl
 ├── Underwriting
 │    ├── documentIds[]
 │    ├── features           (UnderwritingFeatures)
 │    ├── riskScore          (0–100)
 │    └── decision           (ELIGIBLE / INELIGIBLE)
 ├── Status                  (see State Machine §2)
 ├── Financial
 │    ├── totalRepaid        (in cents)
 │    ├── remainingBalance   (in cents, derived)
 │    └── transactions[]     (Transaction[])
 └── Timestamps
      ├── createdAt
      ├── fundedAt
      ├── disbursedAt
      ├── dueDate
      └── completedAt

Transaction
 ├── transactionId
 ├── loanId
 ├── type                    (FUND | DISBURSE | REPAYMENT | INTEREST | DEFAULT_LOSS)
 ├── fromId
 ├── toId
 ├── amount                  (in cents, always positive)
 ├── idempotencyKey          (prevents duplicate execution)
 └── timestamp

AuditEvent
 ├── eventId
 ├── eventType
 ├── actorId                 (who triggered it)
 ├── entityType              (LOAN | BORROWER | LENDER)
 ├── entityId
 ├── previousState
 ├── newState
 ├── metadata                (arbitrary key-value context)
 ├── correlationId           (trace across services)
 └── timestamp

CreditEvent
 ├── borrowerId
 ├── eventType               (LEVEL_UP | LEVEL_DOWN | LOAN_COMPLETED | LOAN_DEFAULTED)
 ├── loanId
 ├── previousLevel
 ├── newLevel
 └── timestamp
```

---

## 2. Loan State Machine

### 2.1 States

| State | Description | Terminal? |
|-------|-------------|-----------|
| `REQUESTED` | Borrower submitted loan request | No |
| `UNDERWRITING` | AI pipeline processing documents | No |
| `APPROVED` | Passed underwriting, awaiting lender | No |
| `DENIED` | Failed underwriting | Yes |
| `FUNDED` | Lender committed capital | No |
| `DISBURSED` | Capital sent to vendor/borrower | No |
| `REPAYING` | At least one repayment received | No |
| `COMPLETED` | Fully repaid | Yes |
| `DEFAULTED` | Term expired with outstanding balance | Yes |

### 2.2 Transition Table

| # | Current State | Event | Guard Condition | Next State | Side Effects |
|---|--------------|-------|-----------------|------------|-------------|
| T1 | `REQUESTED` | `START_UNDERWRITING` | ≥1 document uploaded | `UNDERWRITING` | Trigger Textract pipeline |
| T2 | `UNDERWRITING` | `APPROVE` | riskScore ≥ threshold AND amount ≤ creditLimit | `APPROVED` | Record UnderwritingResult |
| T3 | `UNDERWRITING` | `DENY` | riskScore < threshold OR amount > creditLimit | `DENIED` | Record denial reason |
| T4 | `APPROVED` | `FUND` | lender.balance ≥ loan.amount | `FUNDED` | Deduct lender balance, create FUND transaction |
| T5 | `FUNDED` | `DISBURSE` | vendorId exists (if vendor loan) | `DISBURSED` | Create DISBURSE transaction, set dueDate |
| T6 | `DISBURSED` | `REPAY` | repaymentAmount > 0 AND remainingBalance > 0 | `REPAYING` | Create REPAYMENT transaction, reduce balance |
| T7 | `REPAYING` | `REPAY` | repaymentAmount > 0 AND remainingBalance > repaymentAmount | `REPAYING` | Create REPAYMENT transaction, reduce balance |
| T8 | `REPAYING` | `REPAY` | repaymentAmount ≥ remainingBalance | `COMPLETED` | Create REPAYMENT transaction, balance → 0, level up |
| T9 | `DISBURSED` | `REPAY` | repaymentAmount ≥ totalOwed | `COMPLETED` | Create REPAYMENT transaction, balance → 0, level up |
| T10 | `DISBURSED` | `TERM_EXPIRED` | now > dueDate AND remainingBalance > 0 | `DEFAULTED` | Create DEFAULT_LOSS transaction, level down |
| T11 | `REPAYING` | `TERM_EXPIRED` | now > dueDate AND remainingBalance > 0 | `DEFAULTED` | Create DEFAULT_LOSS transaction, level down |

### 2.3 Illegal Transitions (explicitly forbidden)

```
DENIED     → any state           (terminal)
COMPLETED  → any state           (terminal)
DEFAULTED  → any state           (terminal)
REQUESTED  → FUNDED              (must pass underwriting)
REQUESTED  → DISBURSED           (must pass underwriting + funding)
APPROVED   → DISBURSED           (must be funded first)
APPROVED   → REPAYING            (must be funded + disbursed first)
FUNDED     → COMPLETED           (must be disbursed first)
any state  → REQUESTED           (cannot revert to initial)
```

> **Rule: Any transition not listed in §2.2 MUST throw an `IllegalStateTransitionError`.**

---

## 3. Credit Ladder

### 3.1 Level Table

| Level | Maximum Loan (cents) | Display Limit | Unlock Condition |
|-------|---------------------|---------------|-----------------|
| 1 | 5_000 | $50 | Registration |
| 2 | 15_000 | $150 | 1 successful repayment |
| 3 | 35_000 | $350 | 2 cumulative successful repayments |
| 4 | 75_000 | $750 | 3 cumulative successful repayments |
| 5 | 150_000 | $1,500 | 5 cumulative successful repayments |
| 6 | 300_000 | $3,000 | 8 cumulative successful repayments |
| 7 | 500_000 | $5,000 | 12 cumulative successful repayments |

### 3.2 Level Change Rules

```
ON LOAN_COMPLETED:
  IF borrower.successfulRepayments >= unlockThreshold(currentLevel + 1):
    borrower.level = min(currentLevel + 1, 7)
  EMIT CreditEvent(LEVEL_UP)

ON LOAN_DEFAULTED:
  borrower.level = max(currentLevel - 2, 1)
  EMIT CreditEvent(LEVEL_DOWN)
```

### 3.3 Active Loan Constraint

```
A borrower may have at most ONE active loan at a time.
Active = status ∈ {REQUESTED, UNDERWRITING, APPROVED, FUNDED, DISBURSED, REPAYING}
```

This prevents a borrower from requesting 10 loans simultaneously at their limit.

---

## 4. Domain Invariants

These are **rules that must NEVER be violated**, regardless of which code path executes them.

### 4.1 Money Invariants

```
INV-M1:  All monetary values are stored as non-negative integers (cents).
INV-M2:  Lender.balance >= 0                              (never negative)
INV-M3:  Loan.amount > 0                                  (no zero/negative loans)
INV-M4:  Loan.remainingBalance >= 0                       (never negative)
INV-M5:  Loan.totalRepaid <= Loan.totalOwed               (can't overpay)
INV-M6:  Loan.totalOwed = Loan.amount + computed_interest (derived, never stored independently)
INV-M7:  Sum of REPAYMENT transactions for a loan = Loan.totalRepaid
INV-M8:  Interest rate ∈ [0.01, 0.50]                     (1% to 50%, sanity bound)
```

### 4.2 Identity Invariants

```
INV-I1:  Loan.borrowerId is immutable after creation.
INV-I2:  Loan.lenderId is null until FUNDED, then immutable.
INV-I3:  A Loan has at most one Lender.
INV-I4:  A Borrower's userId cannot equal a Lender's userId.
         (one role per user in the prototype)
INV-I5:  Every Transaction.loanId must reference an existing Loan.
INV-I6:  Every AuditEvent.entityId must reference an existing entity.
```

### 4.3 State Invariants

```
INV-S1:  Loan.status can only change via transitions defined in §2.2.
INV-S2:  Terminal states (DENIED, COMPLETED, DEFAULTED) cannot transition.
INV-S3:  A Borrower may have at most 1 active loan (see §3.3).
INV-S4:  Borrower.creditLevel ∈ [1, 7].
INV-S5:  Loan.amount <= Borrower.creditLimit at time of APPROVAL.
INV-S6:  Lender.balance >= Loan.amount at time of FUNDING.
```

### 4.4 Temporal Invariants

```
INV-T1:  Loan.fundedAt > Loan.createdAt
INV-T2:  Loan.disbursedAt > Loan.fundedAt
INV-T3:  Loan.completedAt > Loan.disbursedAt
INV-T4:  Loan.dueDate > Loan.disbursedAt
INV-T5:  Every Transaction.timestamp is monotonically increasing per loan.
```

### 4.5 Underwriting Invariants

```
INV-U1:  Underwriting features must pass schema validation before scoring.
INV-U2:  Risk score ∈ [0, 100].
INV-U3:  A Loan can only reach APPROVED if riskScore >= APPROVAL_THRESHOLD.
INV-U4:  APPROVAL_THRESHOLD is a system constant, not per-request configurable.
INV-U5:  Bedrock output must be validated and sanitized before use.
INV-U6:  If Bedrock returns unparseable output, the loan moves to DENIED
         with reason "UNDERWRITING_FAILURE", not silently approved.
```

---

## 5. Aggregate Boundaries

These define which entities must be updated **atomically** (in the same DynamoDB transaction).

```
FUND operation:
  Atomic: { Loan.status → FUNDED, Lender.balance -= amount, Transaction(FUND) }

REPAY operation:
  Atomic: { Loan.totalRepaid += amount, Loan.remainingBalance -= amount,
            Loan.status (if complete), Transaction(REPAYMENT) }

COMPLETE operation:
  Atomic: { Loan.status → COMPLETED, Borrower.creditLevel update,
            CreditEvent, Lender.totalEarned += interest }

DEFAULT operation:
  Atomic: { Loan.status → DEFAULTED, Borrower.creditLevel -= 2,
            CreditEvent, Transaction(DEFAULT_LOSS) }
```

> **Rule: If any part of an atomic operation fails, the ENTIRE operation must fail.**
> We use DynamoDB TransactWriteItems for this.

---

## 6. Schemas (Boundary Validation)

Every boundary in the system validates its input. No trust.

### 6.1 API Input Schemas

```typescript
// Validated at API Gateway + Lambda handler entry
CreateLoanRequest {
  amount:      integer, min: 100, max: 50000000  // $1 to $500,000 in cents
  termDays:    integer, min: 7, max: 365
  purpose:     string, minLength: 5, maxLength: 500
  vendorName:  string, optional, maxLength: 200
  vendorId:    string, optional, uuid
}

RepaymentRequest {
  amount:           integer, min: 1
  idempotencyKey:   string, uuid
}

FundLoanRequest {
  idempotencyKey:   string, uuid
}
```

### 6.2 Bedrock Output Schema

```typescript
// Validated AFTER Bedrock returns, BEFORE scoring
UnderwritingFeatures {
  monthlyRevenue:     number, min: 0, max: 100_000_000
  revenueVolatility:  number, min: 0, max: 1.0
  transactionCount:   integer, min: 0, max: 1_000_000
  previousLoans:      integer, min: 0, max: 10_000
  previousDefaults:   integer, min: 0, max: 10_000
  debtToIncome:       number, min: 0, max: 10.0
  cashFlowScore:      integer, min: 0, max: 100
}
```

```
Bedrock raw response
   ↓ JSON.parse (can fail → UNDERWRITING_FAILURE)
   ↓ Schema validation (can fail → UNDERWRITING_FAILURE)
   ↓ Range validation (can fail → UNDERWRITING_FAILURE)
   ↓ Business validation (previousDefaults <= previousLoans)
   ↓ Deterministic scoring engine
   ↓ Credit decision
```

### 6.3 DynamoDB Read Schema

```
// Validated AFTER reading from DynamoDB, BEFORE using in business logic
// Protects against data corruption or schema migration issues
```

---

## 7. Idempotency Rules

Every state-changing operation defines its idempotency behavior:

| Operation | Idempotency Key | Behavior on Duplicate |
|-----------|----------------|----------------------|
| `createLoan` | borrowerId + timestamp (debounce 5s) | Return existing loan |
| `fundLoan` | `FundLoanRequest.idempotencyKey` | Return current loan state |
| `disburseLoan` | loanId (only one disbursement possible) | Return current loan state |
| `repayLoan` | `RepaymentRequest.idempotencyKey` | Return existing transaction |
| `completeLoan` | loanId (only one completion possible) | Return current loan state |
| `defaultLoan` | loanId (only one default possible) | Return current loan state |

**Implementation:** DynamoDB conditional writes.

```
fundLoan:
  ConditionExpression: "attribute_exists(loanId) AND #status = :approved"
  
  If condition fails → loan is not in APPROVED state
    → either already funded (idempotent success)
    → or in wrong state (error)
```

---

## 8. Money Representation

```
UNIT:       cent (1/100 of a dollar)
TYPE:       integer (never floating point)
STORAGE:    DynamoDB Number
DISPLAY:    amount / 100 with 2 decimal places
CONVERSION: toDisplay(5000) → "$50.00"
            toCents("50.00") → 5000

INTEREST CALCULATION:
  interestAmount = floor(principal * rate)
  
  Example:
    principal = 5000 (cents) = $50.00
    rate = 0.15
    interest = floor(5000 * 0.15) = 750 (cents) = $7.50
    totalOwed = 5000 + 750 = 5750 (cents) = $57.50

RULE: All arithmetic uses integer math. No parseFloat on money. Ever.
```
