import { APIGatewayProxyEvent } from 'aws-lambda';
import { FundLoanService } from '../../../../backend/src/application/funding/FundLoanService';
import { makeFundLoanHandler } from '../../../../backend/src/handlers/loan/fundLoan';

const eventWithClaims = (claims: Record<string, unknown>): APIGatewayProxyEvent =>
  ({
    body: JSON.stringify({
      loanId: 'L-1',
      idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
    }),
    headers: {},
    httpMethod: 'POST',
    path: '/loans/fund',
    requestContext: { authorizer: { claims } },
  }) as unknown as APIGatewayProxyEvent;

describe('fundLoan Handler', () => {
  it('passes the authenticated lender sub to the service', async () => {
    const service = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as FundLoanService;
    const handler = makeFundLoanHandler(service);

    const result = await handler(
      eventWithClaims({ sub: 'cognito-lender-sub', 'cognito:groups': ['LENDER'] }),
    );

    expect(result.statusCode).toBe(200);
    expect(service.execute).toHaveBeenCalledWith(
      { loanId: 'L-1', idempotencyKey: '123e4567-e89b-12d3-a456-426614174000' },
      'cognito-lender-sub',
    );
  });

  it('returns 401 when the authenticated identity is missing', async () => {
    const service = { execute: jest.fn() } as unknown as FundLoanService;
    const handler = makeFundLoanHandler(service);

    const result = await handler(eventWithClaims({ 'cognito:groups': ['LENDER'] }));

    expect(result.statusCode).toBe(401);
    expect(JSON.parse(result.body)).toEqual({ error: 'Unauthorized' });
    expect(service.execute).not.toHaveBeenCalled();
  });

  it('returns 403 when the authenticated user is not a lender', async () => {
    const service = { execute: jest.fn() } as unknown as FundLoanService;
    const handler = makeFundLoanHandler(service);

    const result = await handler(
      eventWithClaims({ sub: 'cognito-borrower-sub', 'cognito:groups': ['BORROWER'] }),
    );

    expect(result.statusCode).toBe(403);
    expect(JSON.parse(result.body)).toEqual({ error: 'Forbidden' });
    expect(service.execute).not.toHaveBeenCalled();
  });

  it('does not accept lenderId from the request body', async () => {
    const service = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as FundLoanService;
    const handler = makeFundLoanHandler(service);
    const event = eventWithClaims({ sub: 'cognito-lender-sub', 'cognito:groups': 'LENDER' });
    event.body = JSON.stringify({
      loanId: 'L-1',
      lenderId: 'untrusted-lender',
      idempotencyKey: '123e4567-e89b-12d3-a456-426614174000',
    });

    await handler(event);

    expect(service.execute).toHaveBeenCalledWith(
      { loanId: 'L-1', idempotencyKey: '123e4567-e89b-12d3-a456-426614174000' },
      'cognito-lender-sub',
    );
  });
});
