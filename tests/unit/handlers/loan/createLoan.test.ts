import { makeCreateLoanHandler } from '../../../../backend/src/handlers/loan/createLoan';
import { CreateLoanService, BorrowerRepository } from '../../../../backend/src/application/loans/CreateLoanService';
import { LoanRepository } from '../../../../backend/src/domain/repositories';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('createLoan Handler', () => {
  let mockLoanRepo: jest.Mocked<LoanRepository>;
  let mockBorrowerRepo: jest.Mocked<BorrowerRepository>;
  let handler: ReturnType<typeof makeCreateLoanHandler>;

  beforeEach(() => {
    mockLoanRepo = { getById: jest.fn(), fundLoanTx: jest.fn(), repayLoanTx: jest.fn(), save: jest.fn() };
    mockBorrowerRepo = { getLevel: jest.fn(), getActiveLoanCount: jest.fn() };
    const service = new CreateLoanService(mockLoanRepo, mockBorrowerRepo);
    handler = makeCreateLoanHandler(service);
  });

  const createEvent = (body: any, headers: Record<string, string> = { 'x-borrower-id': 'B-1' }): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    headers,
    httpMethod: 'POST',
    path: '/loans',
  } as any);

  it('returns 201 on success', async () => {
    mockBorrowerRepo.getActiveLoanCount.mockResolvedValue(0);
    mockBorrowerRepo.getLevel.mockResolvedValue(1);

    const result = await handler(createEvent({
      amount: 4000,
      termDays: 30,
      purpose: 'Inventory purchase'
    }));

    expect(result.statusCode).toBe(201);
    const body = JSON.parse(result.body);
    expect(body.amount).toBe(4000);
    expect(body.status).toBe('REQUESTED');
  });

  it('returns 400 on Zod validation failure', async () => {
    const result = await handler(createEvent({
      amount: 50, // Invalid: Minimum is 100 cents ($1.00)
      termDays: 30,
      purpose: 'Inventory'
    }));

    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('VALIDATION_ERROR');
    expect(body.details[0].path).toContain('amount');
  });

  it('returns 400 when Domain invariant fails (e.g., Credit Limit Exceeded)', async () => {
    mockBorrowerRepo.getActiveLoanCount.mockResolvedValue(0);
    mockBorrowerRepo.getLevel.mockResolvedValue(1); // Level 1 limit is $50 (5000 cents)

    const result = await handler(createEvent({
      amount: 6000, // Invalid: exceeds $50 limit
      termDays: 30,
      purpose: 'Exceeding limit test'
    }));

    // In CreateLoanService, exceeding limit throws DomainError with 400 statusCode
    expect(result.statusCode).toBe(400);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('LIMIT_EXCEEDED');
  });

  it('returns 409 when Domain invariant fails (e.g., Max active loans)', async () => {
    mockBorrowerRepo.getActiveLoanCount.mockResolvedValue(1); // Already has an active loan

    const result = await handler(createEvent({
      amount: 4000,
      termDays: 30,
      purpose: 'Another loan'
    }));

    expect(result.statusCode).toBe(409);
    const body = JSON.parse(result.body);
    expect(body.error).toBe('MAX_ACTIVE_LOANS_EXCEEDED');
  });
});
