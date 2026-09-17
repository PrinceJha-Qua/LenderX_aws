# ADR-002: DynamoDB Over RDS

**Date:** 2026-09-17
**Status:** Accepted

## Context
LenderX needs a primary database. Our data model has Users, Loans, Transactions, CreditHistory, Documents, and AuditEvents.

## Decision
Amazon DynamoDB in on-demand (pay-per-request) mode.

## Alternatives Considered
1. **Amazon RDS (PostgreSQL)** — Relational, SQL, strong consistency. But requires VPC, fixed cost (~$15/day for smallest instance), and Lambda-to-RDS connection management (RDS Proxy adds complexity).
2. **Amazon Aurora Serverless v2** — Serverless relational, but minimum cost is higher and cold start adds to Lambda latency.
3. **DynamoDB** — NoSQL, pay-per-request, no VPC, instant scale.

## Why DynamoDB
- **No VPC required.** Keeps Lambda architecture simple. No NAT Gateway costs.
- **Pay-per-request.** Zero cost when idle. Critical with $100 credits.
- **TransactWriteItems.** Supports ACID transactions across multiple items — sufficient for our atomicity requirements (fund loan, repayment, credit update).
- **Fast Lambda cold starts.** No connection pool management.
- **GSIs cover our access patterns.** We have 6 access patterns, all solvable with partition keys + GSIs.

## Consequences
- No JOINs. Denormalize where needed, or make multiple queries.
- No ad-hoc SQL queries for debugging. Use DynamoDB console or PartiQL.
- GSI eventual consistency (acceptable for our read patterns).
- Schema enforcement is our responsibility (Zod validation on read/write).

## Access Patterns Covered

| Pattern | Table | Key/Index |
|---------|-------|-----------|
| Get user by ID | Users | PK: userId |
| Get user by email | Users | GSI: email-index |
| Get loan by ID | Loans | PK: loanId |
| Get borrower's loans | Loans | GSI: borrower-index |
| Get lender's portfolio | Loans | GSI: lender-index |
| Get available opportunities | Loans | GSI: status-index (status=APPROVED) |
| Get credit history | CreditHistory | PK: borrowerId, SK: timestamp |
| Get loan transactions | Transactions | GSI: loanId-index |
| Get audit trail | AuditEvents | PK: entityId, SK: timestamp |
