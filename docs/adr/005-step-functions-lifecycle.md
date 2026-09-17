# ADR-005: Step Functions for Loan Lifecycle

**Date:** 2026-09-17
**Status:** Accepted

## Context
A loan goes through 9 possible states with 11 legal transitions. We need an orchestration mechanism that is visual, auditable, and handles retries and timeouts.

## Decision
AWS Step Functions (Standard Workflows) to manage the loan lifecycle as a state machine.

## Alternatives Considered
1. **Status field in DynamoDB + Lambda logic** — Simple, but no built-in timeout handling, no visual execution history, error-prone state management.
2. **EventBridge + Lambda chain** — Event-driven, but no global view of a loan's lifecycle. Hard to debug.
3. **SQS queues** — Good for decoupling, but not an orchestrator. No state machine semantics.

## Why Step Functions
- **Visual state machine.** The Step Functions console shows the exact state of every loan execution. Judges can literally see it.
- **Built-in timeout.** If a loan isn't repaid by its dueDate, Step Functions can trigger the TERM_EXPIRED event automatically using Wait states.
- **Built-in retry.** If a Lambda fails, Step Functions retries with backoff automatically.
- **Audit trail.** Every state transition is logged in execution history.
- **Architecture diagram is the product.** The ASL definition IS the business process.

## Consequences
- Each loan creates a Step Functions execution (~$0.025 per 1000 state transitions). Cost is trivial.
- Standard Workflows (not Express) for durability — executions can run for up to 1 year.
- State machine definition in ASL (Amazon States Language) adds a config file to manage.
- Step Functions are region-bound — all Lambda functions must be in the same region.

## The State Machine (ASL structure)

```
StartAt: Underwriting

States:
  Underwriting:
    Type: Task (processDocument Lambda)
    → Success: CheckApproval
    → Failure: Denied

  CheckApproval:
    Type: Choice
    riskScore >= 60 → Approved
    riskScore < 60  → Denied

  Approved:
    Type: Task (markApproved Lambda)
    → WaitForFunding

  Denied:
    Type: Task (markDenied Lambda)
    → End

  WaitForFunding:
    Type: Task + Callback
    → Funded (when lender calls fundLoan)
    → Timeout after 7 days → Expired

  Funded:
    Type: Task (recordFunding Lambda)
    → Disburse

  Disburse:
    Type: Task (disburseLoan Lambda)
    → WaitForRepayment

  WaitForRepayment:
    Type: Parallel
    Branch 1: Wait for callback (repayment)
    Branch 2: Wait until dueDate (timeout)
    → If repaid in full: Completed
    → If timeout: Defaulted

  Completed:
    Type: Task (completeLoan Lambda)
    → End

  Defaulted:
    Type: Task (defaultLoan Lambda)
    → End
```
