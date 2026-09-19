import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  TransactWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { LoanRepository } from '../../domain/repositories';
import { Loan } from '../../domain/loan/Loan';
import { LoanStatus } from '../../domain/loan/LoanStatus';

export class DynamoDbLoanRepository implements LoanRepository {
  constructor(
    private docClient: DynamoDBDocumentClient,
    private tableName: string,
  ) {}

  private toItem(loan: Loan) {
    const data = loan.snapshot();
    return {
      PK: `LOAN#${data.loanId}`,
      SK: `META`,
      GSI1PK: `BORROWER#${data.borrowerId}`,
      GSI1SK: `LOAN#${data.createdAt.toISOString()}`,
      Type: 'LOAN',
      ...data,
      // DynamoDB doesn't store JS Dates natively
      createdAt: data.createdAt.toISOString(),
      dueDate: data.dueDate?.toISOString() || null,
      fundedAt: data.fundedAt?.toISOString() || null,
      disbursedAt: data.disbursedAt?.toISOString() || null,
      completedAt: data.completedAt?.toISOString() || null,
    };
  }

  private fromItem(item: any): Loan {
    return Loan.fromSnapshot({
      loanId: item.loanId,
      borrowerId: item.borrowerId,
      lenderId: item.lenderId,
      amount: item.amount,
      termDays: item.termDays,
      interestRate: item.interestRate,
      status: item.status as LoanStatus,
      riskScore: item.riskScore,
      totalRepaid: item.totalRepaid,
      remainingBalance: item.remainingBalance,
      createdAt: new Date(item.createdAt),
      dueDate: item.dueDate ? new Date(item.dueDate) : null,
      fundedAt: item.fundedAt ? new Date(item.fundedAt) : null,
      disbursedAt: item.disbursedAt ? new Date(item.disbursedAt) : null,
      completedAt: item.completedAt ? new Date(item.completedAt) : null,
    });
  }

  async save(loan: Loan): Promise<void> {
    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: this.toItem(loan),
      }),
    );
  }

  async getById(id: string): Promise<Loan | null> {
    const res = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `LOAN#${id}`, SK: 'META' },
      }),
    );
    if (!res.Item) return null;
    return this.fromItem(res.Item);
  }

  async fundLoanTx(loan: Loan, lenderId: string, idempotencyKey: string): Promise<void> {
    const item = this.toItem(loan);

    await this.docClient.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            // 1. Update the Loan (ensure it's still in APPROVED state in DB)
            Put: {
              TableName: this.tableName,
              Item: item,
              ConditionExpression: '#status = :expectedStatus',
              ExpressionAttributeNames: { '#status': 'status' },
              ExpressionAttributeValues: { ':expectedStatus': LoanStatus.APPROVED },
            },
          },
          {
            // 2. Deduct Lender Balance (Using Update to ensure atomicity without reading)
            Update: {
              TableName: this.tableName,
              Key: { PK: `LENDER#${lenderId}`, SK: 'META' },
              UpdateExpression: 'SET balance = balance - :amount',
              ConditionExpression: 'balance >= :amount',
              ExpressionAttributeValues: { ':amount': item.amount },
            },
          },
          {
            // 3. Idempotency Guard (Fails transaction if key already exists)
            Put: {
              TableName: this.tableName,
              Item: {
                PK: `IDEMPOTENCY#${idempotencyKey}`,
                SK: 'META',
                ttl: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24hr expiry
              },
              ConditionExpression: 'attribute_not_exists(PK)',
            },
          },
        ],
      }),
    );
  }

  async repayLoanTx(loan: Loan, idempotencyKey: string): Promise<void> {
    const item = this.toItem(loan);

    await this.docClient.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            // 1. Update the Loan
            Put: {
              TableName: this.tableName,
              Item: item,
            },
          },
          {
            // 2. Idempotency Guard
            Put: {
              TableName: this.tableName,
              Item: {
                PK: `IDEMPOTENCY#${idempotencyKey}`,
                SK: 'META',
                ttl: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
              },
              ConditionExpression: 'attribute_not_exists(PK)',
            },
          },
        ],
      }),
    );
  }
}
