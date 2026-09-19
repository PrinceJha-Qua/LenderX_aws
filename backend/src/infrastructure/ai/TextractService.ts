import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';

export interface DocumentTextExtractor {
  extractText(bucket: string, key: string): Promise<string>;
}

export class TextractService implements DocumentTextExtractor {
  constructor(private client: TextractClient) {}

  async extractText(bucket: string, key: string): Promise<string> {
    const command = new DetectDocumentTextCommand({
      Document: {
        S3Object: { Bucket: bucket, Name: key },
      },
    });

    const response = await this.client.send(command);

    if (!response.Blocks) {
      return '';
    }

    // We only care about LINE blocks (full sentences/lines) to feed to the LLM
    // WORD blocks are too granular and layout blocks aren't needed for this basic extraction
    return response.Blocks.filter((block) => block.BlockType === 'LINE' && block.Text)
      .map((block) => block.Text)
      .join('\n');
  }
}
