import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const getOption = (name: string): string | undefined => {
  const prefix = `--${name}=`;
  const argument = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return argument?.slice(prefix.length) || undefined;
};

const lenderId = getOption('lender-id') || process.env.LENDER_ID;
const balanceCentsValue = getOption('balance-cents') || process.env.LENDER_BALANCE_CENTS;
const tableName = process.env.TABLE_NAME || 'LenderXTable';

if (!lenderId || !balanceCentsValue) {
  throw new Error(
    'Provide --lender-id=<cognito-sub> and --balance-cents=<amount>, or set LENDER_ID and LENDER_BALANCE_CENTS.',
  );
}

const balance = Number(balanceCentsValue);
if (!Number.isSafeInteger(balance) || balance < 0) {
  throw new Error('balance-cents must be a non-negative integer.');
}

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const seed = async (): Promise<void> => {
  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        PK: `LENDER#${lenderId}`,
        SK: 'META',
        Type: 'LENDER',
        lenderId,
        balance,
      },
    }),
  );

  console.log(`Seeded lender ${lenderId} with balance ${balance} cents in ${tableName}.`);
};

seed().catch((error: unknown) => {
  console.error('Failed to seed lender:', error);
  process.exitCode = 1;
});
