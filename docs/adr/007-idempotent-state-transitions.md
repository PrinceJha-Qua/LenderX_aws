# ADR-007: Idempotent State Transitions via Conditional Writes

**Date:** 2026-09-17
**Status:** Accepted

## Context
In a distributed serverless system, any operation can be retried: Lambda retries, API Gateway retries, Step Functions retries, user double-clicks. A "fund loan" operation that runs twice must not deduct the lender's balance twice.

## Decision
All state-changing operations use DynamoDB conditional writes and TransactWriteItems to ensure idempotency.

## Pattern
```
1. Client sends request with idempotencyKey (UUID)
2. Lambda checks: has this idempotencyKey been processed?
3. Lambda checks: is the entity in the expected state?
4. Lambda executes as a DynamoDB transaction with conditions
5. If conditions fail → return existing state (idempotent response)
6. If conditions pass → state changes atomically
```

## Example: Fund Loan
```typescript
TransactWriteItems([
  // Condition: loan is in APPROVED state
  Update Loan SET status=FUNDED WHERE status=APPROVED,

  // Condition: lender has enough balance
  Update Lender SET balance=balance-amount WHERE balance>=amount,

  // Condition: this idempotencyKey hasn't been used
  Put Transaction { idempotencyKey } WHERE attribute_not_exists(idempotencyKey)
])

// If ANY condition fails → ENTIRE transaction rolls back
// If loan is already FUNDED → ConditionalCheckFailed → return current loan (idempotent)
// If lender has insufficient funds → ConditionalCheckFailed → return InsufficientFunds error
```

## Consequences
- Every state-changing API requires an `idempotencyKey` parameter
- Frontend must generate UUIDs for each action attempt
- DynamoDB transactions cost 2x the WCUs of individual writes (acceptable)
- Error handling must distinguish between "idempotent success" and "actual failure"
