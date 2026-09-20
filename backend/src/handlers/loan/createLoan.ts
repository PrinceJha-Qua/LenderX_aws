import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateLoanService } from '../../application/loans/CreateLoanService';
import { CreateLoanSchema } from '../../shared/schemas';
import { ApiHelper } from '../../shared/ApiHelper';
import { getAuthenticatedUser, requireGroup } from '../../shared/auth';

export const makeCreateLoanHandler =
  (service: CreateLoanService) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      // 1. Parse payload
      const body = JSON.parse(event.body || '{}');

      // 2. Strict Zod validation
      const req = CreateLoanSchema.parse(body);

      // 3. Extract Auth Context
      const user = getAuthenticatedUser(event);
      if (!user) {
        return ApiHelper.success(401, { error: 'Unauthorized' });
      }
      if (!requireGroup(user, 'BORROWER')) {
        return ApiHelper.success(403, { error: 'Forbidden' });
      }

      // 4. Execute Business Logic
      const loan = await service.execute(req, user.userId);

      // 5. Return success
      return ApiHelper.success(201, loan.snapshot());
    } catch (error) {
      return ApiHelper.handleError(error);
    }
  };
