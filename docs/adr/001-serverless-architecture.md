# ADR-001: Serverless Architecture

**Date:** 2026-09-17
**Status:** Accepted

## Context
LenderX needs a deployment architecture for the Ship It track. We need a live URL, and "architecture is part of the score."

## Decision
Fully serverless: Lambda + API Gateway + DynamoDB + S3 + Step Functions.
No EC2, no ECS, no containers in production.

## Alternatives Considered
1. **ECS Fargate** — Container-based. More familiar, but requires VPC, load balancer, always-on cost.
2. **EC2** — Full control but wasteful for a hackathon with $100 credits and zero sustained traffic.
3. **Amplify fullstack** — Too opinionated, limits our architecture choices.

## Why Serverless
- **Zero idle cost.** We're not paying when the demo isn't running.
- **Scales to zero.** Explicitly mentioned in the Ship It track description.
- **No infrastructure management.** Focus on business logic, not EC2 patching.
- **Showcases AWS.** Every component is a native AWS service. Maximizes architecture score.
- **Fast deployment.** CDK deploy takes minutes, not hours.

## Consequences
- Cold start latency (~200-500ms) on first Lambda invocation. Acceptable for demo.
- 15-minute Lambda timeout. AI pipeline must complete within this.
- DynamoDB instead of relational DB (see ADR-002).
- Step Functions for orchestration instead of long-running processes.
