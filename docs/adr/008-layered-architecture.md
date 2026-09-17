# ADR-008: Layered Architecture (Domain-Driven)

**Date:** 2026-09-17
**Status:** Accepted

## Context
The initial plan mixed Lambda handler code with business logic and AWS SDK calls. This makes domain logic untestable without mocks and couples LenderX's intelligence to AWS.

## Decision
Four-layer architecture: Handlers → Application → Domain → Infrastructure.
Domain layer has zero AWS dependencies.

## Why
- **The scoring engine should not know DynamoDB exists.** It's a pure function: features in, score out.
- **The credit ladder should not know Lambda exists.** It's arithmetic: current level + outcome = new level.
- **Unit tests should not need aws-sdk-client-mock.** If domain logic is pure, tests are just input → output assertions.
- **The demo narrative is stronger.** "Our underwriting engine is portable — it runs in Lambda today, but the business logic is independent of AWS." That's a mature architecture answer.

## The Layers

| Layer | Knows About | Doesn't Know About |
|-------|-------------|-------------------|
| **Handlers** | HTTP, request parsing, response formatting | Business rules |
| **Application** | Use cases, orchestration, transactions | HTTP, response formats |
| **Domain** | Business rules, entities, scoring, credit | AWS, DynamoDB, S3, HTTP |
| **Infrastructure** | AWS SDK, DynamoDB, S3, Textract, Bedrock | Business rules |

## Dependency Rule
```
Handlers → Application → Domain
Handlers → Application → Infrastructure
Domain → NOTHING
Infrastructure → Shared types only
```

**Inversion:** Application depends on domain interfaces. Infrastructure implements them.
```typescript
// domain/loan/LoanRepository.ts (INTERFACE — no AWS)
interface LoanRepository {
  getById(loanId: string): Promise<Loan>;
  save(loan: Loan): Promise<void>;
  fundLoan(loan: Loan, lender: Lender, idempotencyKey: string): Promise<void>;
}

// infrastructure/dynamodb/DynamoLoanRepository.ts (IMPLEMENTATION — AWS)
class DynamoLoanRepository implements LoanRepository {
  constructor(private client: DynamoDBClient, private tableName: string) {}
  // ... uses DynamoDB SDK
}
```

## Consequences
- More files and indirection than a flat Lambda handler
- But each file is small, single-purpose, and testable
- Domain logic has 95%+ test coverage with zero mocks
- Infrastructure can be swapped (e.g., DynamoDB Local for testing) without touching domain
- Hackathon pragmatism: if time is tight, a handler CAN call domain directly (skip application layer for simple CRUD)
