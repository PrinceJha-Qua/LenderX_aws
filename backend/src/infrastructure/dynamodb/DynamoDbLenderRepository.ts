import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Lender, LenderRepository } from '../../domain/repositories';
import { Money } from '../../shared/Money';

export class DynamoDbLenderRepository implements LenderRepository {
  constructor(
    private docClient: DynamoDBDocumentClient,
    private tableName: string,
  ) {}

  async getById(id: string): Promise<Lender | null> {
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `LENDER#${id}`, SK: 'META' },
      }),
    );

    const balance = result.Item?.balance;
    if (!result.Item || !Money.isValid(balance)) {
      return null;
    }

    return {
      id: typeof result.Item.lenderId === 'string' ? result.Item.lenderId : id,
      balance,
    };
  }
}
