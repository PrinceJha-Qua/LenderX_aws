import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { UnderwritingFeatures } from '../../domain/underwriting/ScoringEngine';
import { DomainError } from '../../shared/errors';

export interface FeatureExtractor {
  extractFeatures(documentText: string): Promise<UnderwritingFeatures>;
}

export class BedrockService implements FeatureExtractor {
  constructor(
    private client: BedrockRuntimeClient,
    private modelId: string = 'amazon.nova-micro-v1:0', // Default to cheap dev model
  ) {}

  async extractFeatures(documentText: string): Promise<UnderwritingFeatures> {
    const prompt = `You are a strict financial underwriter AI. Extract the following business metrics from the provided document text.
Return ONLY a raw JSON object, no markdown formatting, no explanations.
If a value is missing or unknown, make a conservative estimate based on the context, or default to 0 for revenue and 1 for risk factors (like defaults).

Required JSON Schema:
{
  "monthlyRevenue": number,
  "revenueVolatility": number (0.0 to 1.0, where 0 is stable, 1 is highly volatile),
  "transactionCount": number,
  "previousLoans": number,
  "previousDefaults": number,
  "debtToIncome": number (0.0 to 1.0),
  "cashFlowScore": number (0 to 100)
}

Document Text:
---
${documentText.substring(0, 50000)}
---
JSON:`;

    const command = new ConverseCommand({
      modelId: this.modelId,
      messages: [{ role: 'user', content: [{ text: prompt }] }],
      inferenceConfig: { temperature: 0.0, maxTokens: 1000 },
    });

    try {
      const response = await this.client.send(command);
      const outputText = response.output?.message?.content?.[0]?.text;

      if (!outputText) {
        throw new DomainError('No output from Bedrock', 'AI_GENERATION_FAILED', 500);
      }

      // Strip markdown code blocks if the LLM ignores instructions
      const cleanJson = outputText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      // In a real flow, this goes through a Zod Schema validation right here.
      // We will trust it for the prototype boundary right now.
      return JSON.parse(cleanJson) as UnderwritingFeatures;
    } catch (error) {
      console.error('Bedrock extraction failed:', error);
      throw new DomainError('Failed to parse AI underwriting output', 'AI_PARSE_FAILED', 500);
    }
  }
}
