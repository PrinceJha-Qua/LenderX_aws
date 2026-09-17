# ADR-003: Two-Stage AI Pipeline (Textract + Bedrock)

**Date:** 2026-09-17
**Status:** Accepted

## Context
LenderX's core innovation is AI-assisted underwriting — turning messy financial documents into structured credit decisions. We need to extract data from uploaded documents (PDFs, images of bank statements) and convert that into a risk score.

## Decision
Two-stage pipeline:
1. **Amazon Textract** extracts raw text and tables from documents (OCR + structural analysis)
2. **Amazon Bedrock (Claude)** interprets the extracted text and produces structured financial features
3. **Deterministic scoring engine** converts features into a risk score and credit decision

## Alternatives Considered
1. **Bedrock only (send image directly to Claude Vision)** — Simpler, but Claude's OCR accuracy on financial documents with tables is inferior to Textract's specialized extraction. Also wastes Bedrock tokens on OCR work.
2. **Textract only + regex parsing** — No AI reasoning. Would fail on varied document formats. Can't understand context ("is this number revenue or expense?").
3. **Custom ML model (SageMaker)** — Training data doesn't exist for our use case. Overkill for a hackathon.
4. **Third-party credit API (e.g., Plaid)** — Not available for our target markets. Defeats the purpose of the innovation.

## Why Two-Stage
- **Textract excels at what it's built for:** tables, forms, structured extraction from document images. Purpose-built OCR > general-purpose LLM vision.
- **Bedrock excels at what IT's built for:** reasoning, interpretation, structured output. "Is ₹15,000 monthly revenue or a single transaction?" requires understanding.
- **Separation of concerns:** If Textract fails, we know the document was unreadable. If Bedrock fails, we know the interpretation failed. Different error paths.
- **Shows sophisticated AWS composition.** Two specialized services working together > one service doing everything. Architecture score.
- **Cost optimization.** Textract processes the image (cheaper). Bedrock only receives text (smaller input, fewer tokens).

## Consequences
- Pipeline latency: Textract (~5-15s) + Bedrock (~5-10s) = ~10-25s total
- Two AWS services to manage, two failure modes
- Bedrock output MUST be validated (see Engineering Contract §2)
- Textract may need async API for large documents (>1 page)

## The Critical Principle

```
AI extracts and structures information.
Deterministic rules make the final lending decision.

The LLM is NEVER the credit authority.
The scoring engine is.
```
