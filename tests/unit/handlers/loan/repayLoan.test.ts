import { APIGatewayProxyEvent } from 'aws-lambda';
import { RepayLoanService } from '../../../../backend/src/application/loans/RepayLoanService';
import { makeRepayLoanHandler } from '../../../../backend/src/handlers/loan/repayLoan';

const validBody = {
  loanId: 'L-1',
  amount: 2000,
  idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
};

const eventWithClaims = (claims: Record<string, unknown>): APIGatewayProxyEvent =>
  ({
    body: JSON.stringify(validBody),
    headers: {},
    httpMethod: 'POST',
    path: '/loans/repay',
    requestContext: { authorizer: { claims } },
  }) as unknown as APIGatewayProxyEvent;

describe('repayLoan Handler', () => {
  it('passes the authenticated borrower sub to the service', async () => {
    const service = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as RepayLoanService;
    const handler = makeRepayLoanHandler(service);

    const result = await handler(
      eventWithClaims({ sub: 'cognito-borrower-sub', 'cognito:groups': ['BORROWER'] }),
    );

    expect(result.statusCode).toBe(200);
    expect(service.execute).toHaveBeenCalledWith(validBody, 'cognito-borrower-sub');
  });

  it('returns 401 when the authenticated identity is missing', async () => {
    const service = { execute: jest.fn() } as unknown as RepayLoanService;
    const handler = makeRepayLoanHandler(service);

    const result = await handler(eventWithClaims({ 'cognito:groups': ['BORROWER'] }));

    expect(result.statusCode).toBe(401);
    expect(JSON.parse(result.body)).toEqual({ error: 'Unauthorized' });
    expect(service.execute).not.toHaveBeenCalled();
  });

  it('returns 403 when the authenticated user is not a borrower', async () => {
    const service = { execute: jest.fn() } as unknown as RepayLoanService;
    const handler = makeRepayLoanHandler(service);

    const result = await handler(
      eventWithClaims({ sub: 'cognito-lender-sub', 'cognito:groups': ['LENDER'] }),
    );

    expect(result.statusCode).toBe(403);
    expect(JSON.parse(result.body)).toEqual({ error: 'Forbidden' });
    expect(service.execute).not.toHaveBeenCalled();
  });

  it('does not accept borrowerId from the request body', async () => {
    const service = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as RepayLoanService;
    const handler = makeRepayLoanHandler(service);
    const event = eventWithClaims({ sub: 'authenticated-borrower', 'cognito:groups': 'BORROWER' });
    event.body = JSON.stringify({
      ...validBody,
      borrowerId: 'untrusted-borrower',
    });

    await handler(event);

    expect(service.execute).toHaveBeenCalledWith(validBody, 'authenticated-borrower');
  });

  it('validates the repayment request body', async () => {
    const service = { execute: jest.fn() } as unknown as RepayLoanService;
    const handler = makeRepayLoanHandler(service);
    const event = eventWithClaims({ sub: 'authenticated-borrower', 'cognito:groups': 'BORROWER' });
    event.body = JSON.stringify({ ...validBody, amount: 0 });

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('VALIDATION_ERROR');
    expect(service.execute).not.toHaveBeenCalled();
  });
});
