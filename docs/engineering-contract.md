# LenderX — Engineering Contract

> **This document defines how we build, not what we build.**
> Every team member, every sprint, every line of code follows these rules.
> If something contradicts this document, this document wins.

---

## 1. Architecture: Layered Separation

```
┌─────────────────────────────────────────────────┐
│  HANDLERS                                        │
│  Lambda entry points. Parse input, call service, │
│  format output. NO business logic here.          │
├─────────────────────────────────────────────────┤
│  APPLICATION (Services)                          │
│  Orchestrate use cases. Call domain + infra.     │
│  Transaction boundaries live here.               │
├─────────────────────────────────────────────────┤
│  DOMAIN                                          │
│  Pure business logic. No AWS imports.            │
│  Testable with zero mocks.                       │
├─────────────────────────────────────────────────┤
│  INFRASTRUCTURE                                  │
│  AWS SDK calls. DynamoDB, S3, Textract, Bedrock. │
│  Implements repository interfaces.               │
├─────────────────────────────────────────────────┤
│  SHARED                                          │
│  Types, schemas, constants, errors, utils.       │
└─────────────────────────────────────────────────┘
```

### Dependency Rule

```
handlers     → application → domain
handlers     → application → infrastructure
domain       → NOTHING (pure)
infrastructure → shared
shared       → NOTHING
```

**Domain NEVER imports from infrastructure.**

This means:
- `Loan.canBeFunded()` is a pure function. It doesn't know DynamoDB exists.
- `ScoringEngine.score(features)` is a pure function. It doesn't know Bedrock exists.
- `CreditLadder.nextLevel(current, outcome)` is a pure function.

These can be tested with `expect(Loan.canBeFunded(loan, lender)).toBe(true)` — no mocks needed.

### Example Flow: Fund a Loan

```
fundLoan.handler.ts                    ← HANDLER
  │ parse request, extract loanId, lenderId, idempotencyKey
  │ call FundingService.fund()
  ▼
FundingService.fund()                  ← APPLICATION
  │ loanRepo.getById(loanId)
  │ lenderRepo.getById(lenderId)
  │ Loan.canBeFunded(loan, lender)     ← DOMAIN (pure check)
  │ if no → throw IneligibleError
  │ loanRepo.fundLoan(loan, lender, idempotencyKey)  ← INFRA
  │ auditRepo.record(event)           ← INFRA
  │ return result
  ▼
fundLoan.handler.ts
  │ format response
  │ return 200
```

### Directory Structure

```
backend/src/
├── domain/                  # Pure business logic (NO AWS imports)
│   ├── loan/
│   │   ├── Loan.ts          # Loan entity + business methods
│   │   ├── LoanStatus.ts    # Status enum + transition logic
│   │   └── LoanRules.ts     # Validation rules
│   ├── borrower/
│   │   ├── Borrower.ts      # Borrower entity
│   │   └── BorrowerRules.ts
│   ├── lender/
│   │   └── Lender.ts
│   ├── underwriting/
│   │   ├── ScoringEngine.ts # Deterministic scoring (pure)
│   │   └── FeatureValidator.ts
│   ├── credit/
│   │   ├── CreditLadder.ts  # Level calculations (pure)
│   │   └── CreditRules.ts
│   └── shared/
│       ├── Money.ts         # Money value object (integer cents)
│       ├── Errors.ts        # Domain error types
│       └── invariants.ts    # Invariant assertion helpers
│
├── application/             # Use case orchestration
│   ├── loans/
│   │   ├── CreateLoanService.ts
│   │   ├── FundLoanService.ts
│   │   └── RepayLoanService.ts
│   ├── underwriting/
│   │   └── UnderwritingService.ts
│   └── funding/
│       └── DisbursementService.ts
│
├── infrastructure/          # AWS SDK implementations
│   ├── dynamodb/
│   │   ├── LoanRepository.ts
│   │   ├── UserRepository.ts
│   │   ├── TransactionRepository.ts
│   │   └── AuditRepository.ts
│   ├── s3/
│   │   └── DocumentStorage.ts
│   ├── textract/
│   │   └── TextractClient.ts
│   ├── bedrock/
│   │   └── BedrockClient.ts
│   └── stepfunctions/
│       └── WorkflowClient.ts
│
├── handlers/                # Lambda entry points (thin)
│   ├── user/
│   ├── loan/
│   ├── underwriting/
│   ├── lifecycle/
│   └── admin/
│
└── shared/                  # Cross-cutting concerns
    ├── types.ts             # TypeScript types/interfaces
    ├── schemas.ts           # Zod schemas for validation
    ├── constants.ts         # System constants
    ├── logger.ts            # Structured logging
    ├── correlation.ts       # Correlation ID management
    └── errors.ts            # Error types and handling
```

---

## 2. Validation at Every Boundary

```
RULE: Never trust input from any source. Validate at every boundary.
```

| Boundary | What Enters | Validation |
|----------|-------------|------------|
| API Gateway → Handler | HTTP request body | Zod schema parse |
| Handler → Service | Parsed request DTO | Type system (TypeScript) |
| Service → Domain | Entity data | Domain invariant checks |
| DynamoDB → Repository | Stored record | Schema validation on read |
| Textract → Pipeline | OCR text | Null/empty check |
| Bedrock → Pipeline | JSON string | JSON parse → Zod schema → range check → business rules |
| Frontend → API | User input | Client-side + server-side validation |
| Step Functions → Lambda | State input | Schema validation |

### Bedrock Output Validation (critical)

```
Bedrock returns raw text
   ↓
Step 1: Extract JSON from response (regex or markers)
   ↓ FAIL → UnderwritingFailure("LLM returned non-JSON")
Step 2: JSON.parse()
   ↓ FAIL → UnderwritingFailure("Invalid JSON")
Step 3: Zod schema validation (correct fields, correct types)
   ↓ FAIL → UnderwritingFailure("Schema mismatch")
Step 4: Range validation (revenue ≥ 0, score ∈ [0,100], etc.)
   ↓ FAIL → UnderwritingFailure("Values out of range")
Step 5: Business validation (defaults ≤ loans, etc.)
   ↓ FAIL → UnderwritingFailure("Inconsistent data")
Step 6: Deterministic scoring
   ↓
Step 7: Credit decision
```

**The LLM is treated as an unreliable data source. Always.**

---

## 3. Idempotency

```
RULE: Every state-changing operation MUST be idempotent.
      Retrying the same request produces the same result without side effects.
```

**Implementation pattern: DynamoDB conditional writes**

```typescript
// FUND operation
await dynamodb.transactWrite({
  TransactItems: [
    {
      Update: {
        TableName: 'Loans',
        Key: { loanId },
        UpdateExpression: 'SET #status = :funded, lenderId = :lid, fundedAt = :ts',
        ConditionExpression: '#status = :approved',  // ← GUARD
        // If loan is already FUNDED, this fails gracefully
      }
    },
    {
      Update: {
        TableName: 'Users',
        Key: { userId: lenderId },
        UpdateExpression: 'SET balance = balance - :amount',
        ConditionExpression: 'balance >= :amount',  // ← GUARD
      }
    },
    {
      Put: {
        TableName: 'Transactions',
        Item: { transactionId, idempotencyKey, ... },
        ConditionExpression: 'attribute_not_exists(idempotencyKey)',  // ← GUARD
      }
    }
  ]
});
```

If any condition fails → entire transaction rolls back → no partial state.

---

## 4. Money

```
RULE: All money is integer cents. No floating point. No exceptions.
```

```typescript
// shared/Money.ts

type Cents = number & { readonly __brand: 'Cents' };

function toCents(dollars: number): Cents {
  return Math.round(dollars * 100) as Cents;
}

function toDisplay(cents: Cents): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function calculateInterest(principal: Cents, rate: number): Cents {
  return Math.floor(principal * rate) as Cents;
}

// NEVER: amount = 50.00   (floating point dollars)
// ALWAYS: amount = 5000   (integer cents)
```

---

## 5. Observability

### 5.1 Structured Logging

Every log entry includes:

```json
{
  "level": "INFO",
  "message": "Loan funded successfully",
  "correlationId": "req-abc-123",
  "requestId": "lambda-xyz-456",
  "userId": "usr-789",
  "loanId": "loan-012",
  "service": "FundingService",
  "action": "fundLoan",
  "duration_ms": 234,
  "timestamp": "2026-09-19T10:30:00Z"
}
```

### 5.2 Correlation IDs

```
API Request arrives
  → Extract/generate correlationId from X-Correlation-Id header
  → Pass through: Handler → Service → Repository → Audit
  → Attach to: Step Functions input, EventBridge detail

ALL log lines for one user action share the same correlationId.
```

### 5.3 Error Logging

```
Every catch block logs:
  - correlationId
  - error name
  - error message
  - stack trace
  - input that caused the error (sanitized — no PII)
  - which layer it occurred in (handler/service/domain/infra)
```

### 5.4 CloudWatch Metrics (custom)

```
LenderX/Loans/Created         count
LenderX/Loans/Funded          count
LenderX/Loans/Completed       count
LenderX/Loans/Defaulted       count
LenderX/Underwriting/Duration milliseconds
LenderX/Underwriting/Approved count
LenderX/Underwriting/Denied   count
LenderX/Underwriting/Failed   count  (Bedrock/Textract failure)
LenderX/CreditLadder/LevelUp  count
```

---

## 6. Failure Path Engineering

For every external dependency, we define expected behavior on failure:

| Dependency | Failure Mode | Retry? | Fallback | Loan State | User Message |
|------------|-------------|--------|----------|------------|-------------|
| **Textract** | Timeout (>60s) | Yes, 2x with backoff | None | Stays in UNDERWRITING | "Processing your documents, please wait..." |
| **Textract** | Service error | Yes, 2x | None | → DENIED (reason: SERVICE_ERROR) | "Unable to process documents. Please retry." |
| **Bedrock** | Timeout (>30s) | Yes, 1x | Try Haiku model | Stays in UNDERWRITING | "Analyzing your data..." |
| **Bedrock** | Invalid JSON response | No | Retry with stricter prompt, 1x | → DENIED (reason: UNDERWRITING_FAILURE) | "Unable to complete assessment." |
| **Bedrock** | Service error | Yes, 1x | None | → DENIED (reason: SERVICE_ERROR) | "Service temporarily unavailable." |
| **DynamoDB** | ConditionalCheckFailed | No | Return idempotent response | Unchanged | Depends on context |
| **DynamoDB** | Throttled | Yes, auto (SDK) | None | Unchanged | "Please try again." |
| **DynamoDB** | TransactionCancelled | No | Check which condition failed | Unchanged | Specific error per condition |
| **S3** | Upload fails | Yes, 2x | None | Unchanged | "Upload failed. Please retry." |
| **Step Functions** | Start execution fails | Yes, 1x | None | Stays in current state | "Processing delayed." |
| **Cognito** | Auth token expired | No | Frontend refresh token | N/A | Redirect to login |

**Rule: No unhandled promise rejections. No silent failures. Every error path is explicit.**

---

## 7. Security Model

### 7.1 Authentication & Authorization

```
Authentication:  AWS Cognito JWT tokens
Authorization:   Role-based (LENDER | BORROWER | ADMIN)

RULE: Every API endpoint checks role before executing business logic.
```

### 7.2 Access Control Matrix

| Endpoint | BORROWER | LENDER | ADMIN |
|----------|----------|--------|-------|
| POST /borrower/loans | ✅ (own) | ❌ | ✅ |
| GET /borrower/loans | ✅ (own) | ❌ | ✅ |
| POST /borrower/loans/{id}/documents | ✅ (own) | ❌ | ✅ |
| POST /borrower/loans/{id}/repay | ✅ (own) | ❌ | ✅ |
| GET /lender/opportunities | ❌ | ✅ | ✅ |
| POST /lender/fund/{id} | ❌ | ✅ (own funds) | ✅ |
| GET /lender/portfolio | ❌ | ✅ (own) | ✅ |
| POST /admin/seed | ❌ | ❌ | ✅ |

### 7.3 Tenant Isolation

```
RULE: Borrower A MUST NEVER access Borrower B's data.
RULE: Lender A MUST NEVER modify Lender B's portfolio.

Implementation: Every query includes userId filter from JWT.
      Never trust a userId from the request body.
      Always extract from the verified token.
```

### 7.4 S3 Access Control

```
RULE: S3 documents are PRIVATE.
RULE: Access is ONLY via presigned URLs with 15-minute expiry.
RULE: Presigned URLs are scoped to the requesting user's documents.
```

### 7.5 Input Sanitization

```
RULE: All string inputs are trimmed and length-bounded.
RULE: No HTML/script content in any text field.
RULE: File uploads are validated for type (PDF, PNG, JPG only) and size (<10MB).
```

---

## 8. Definition of Done

A feature is **DONE** only when ALL of the following are true:

```
□  Implementation complete (handler + service + domain + infra)
□  Domain invariants respected (cross-check against domain-model.md)
□  Unit tests written for domain logic
□  Integration tests written where applicable
□  Input validation implemented (Zod schemas)
□  Error paths handled (try/catch, specific error types)
□  Idempotency implemented for state changes
□  Authorization verified (correct role check)
□  Structured logging added (correlationId, action, result)
□  Documentation updated (sprint review)
□  Deployed successfully to AWS
□  Manual smoke test passed on live URL
□  No regressions in existing tests
□  Git commit pushed with conventional message
```

> **We don't mark things done because the code runs.**
> **We mark them done because the behavior has been verified.**

---

## 9. Sprint Discipline

### 9.1 Every Sprint Leaves the Repo Recoverable

```
RULE: No half-built branches.
RULE: No 3-hour uncommitted experiments.
RULE: No "we'll fix it later."
```

Every sprint ends with:
```
Build → Test → Verify → Commit → Document
```

### 9.2 Main Branch is Always Deployable

```
RULE: `main` is always in a state where `cdk deploy` succeeds
      and the live URL works.
```

Feature branches are merged only after the increment test gate passes.

### 9.3 Scope Lock

```
RULE: Don't build features from Increment N+2 during Increment N.
RULE: If a feature is "nice to have" and not in the sprint plan, it waits.
RULE: The plan changes only through an explicit decision, not through drift.
```

---

## 10. Coding Principles

```
1. TYPES OVER COMMENTS.      Use TypeScript's type system to make illegal states unrepresentable.
2. FAIL FAST.                 Validate early, throw descriptive errors.
3. PURE OVER EFFECTFUL.       Domain logic has no side effects.
4. EXPLICIT OVER IMPLICIT.    No magic strings, no implicit type coercions.
5. SMALL FUNCTIONS.           Each function does one thing.
6. NO ANY.                    TypeScript `any` is forbidden except in test fixtures.
7. ERRORS ARE VALUES.         Use typed error classes, not generic Error.
8. LOG EVERYTHING USEFUL.     But never log PII or credentials.
9. IMMUTABLE BY DEFAULT.      Use readonly, const, Object.freeze where practical.
10. NAMES MATTER.             A variable named `x` is a code review failure.
```

---

## 11. Hackathon-Specific Pragmatism

This is a 4-day build. The engineering contract exists to prevent chaos, not to prevent shipping.

```
RULE: Perfect is the enemy of shipped.
RULE: If a choice is between "architecturally elegant" and "works by tomorrow,"
      choose "works" and add a TODO comment.
RULE: TODOs are logged in documents/testing-reports/ and never forgotten silently.
RULE: The demo video is the deliverable. Everything else serves the demo.
```

### What We Skip (Consciously)

| Engineering Practice | Status | Why |
|---------------------|--------|-----|
| 100% test coverage | Skip | 80% on business logic is enough |
| Load testing | Skip | We're not expecting traffic |
| Formal code review | Skip | AI writes it, we verify it |
| CI/CD pipeline | Skip | Manual `cdk deploy` is fine |
| Database migrations | Skip | We redeploy from scratch |
| i18n / localization | Skip | English only |
| Accessibility (a11y) | Skip | Not in judging criteria |
| Rate limiting | Skip | Not production |
| Monitoring alerts | Skip | We watch it live |

---

*This document is final. Sprint 1 begins when the setup checklist is complete.*
