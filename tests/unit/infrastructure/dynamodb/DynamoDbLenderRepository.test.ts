import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDbLenderRepository } from '../../../../backend/src/infrastructure/dynamodb/DynamoDbLenderRepository';

describe('DynamoDbLenderRepository', () => {
  it('loads a lender balance by lender partition key', async () => {
    const send = jest.fn().mockResolvedValue({
      Item: {
        PK: 'LENDER#cognito-lender-sub',
        SK: 'META',
        Type: 'LENDER',
        lenderId: 'cognito-lender-sub',
        balance: 10000000,
      },
    });
    const repository = new DynamoDbLenderRepository(
      { send } as unknown as DynamoDBDocumentClient,
      'LenderXTable',
    );

    await expect(repository.getById('cognito-lender-sub')).resolves.toEqual({
      id: 'cognito-lender-sub',
      balance: 10000000,
    });

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          TableName: 'LenderXTable',
          Key: { PK: 'LENDER#cognito-lender-sub', SK: 'META' },
        },
      }),
    );
  });

  it('returns null when the lender record does not exist', async () => {
    const repository = new DynamoDbLenderRepository(
      { send: jest.fn().mockResolvedValue({}) } as unknown as DynamoDBDocumentClient,
      'LenderXTable',
    );

    await expect(repository.getById('missing-lender')).resolves.toBeNull();
  });
});
