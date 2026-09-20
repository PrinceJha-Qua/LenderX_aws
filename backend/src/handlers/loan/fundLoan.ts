import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FundLoanService } from '../../application/funding/FundLoanService';
import { FundLoanSchema } from '../../shared/schemas';
import { ApiHelper } from '../../shared/ApiHelper';
import { getAuthenticatedUser, requireGroup } from '../../shared/auth';

export const makeFundLoanHandler =
  (service: FundLoanService) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const user = getAuthenticatedUser(event);
      if (!user) {
        return ApiHelper.success(401, { error: 'Unauthorized' });
      }
      if (!requireGroup(user, 'LENDER')) {
        return ApiHelper.success(403, { error: 'Forbidden' });
      }

      const body = JSON.parse(event.body || '{}');
      const req = FundLoanSchema.parse(body);

      // Execute the atomic funding logic
      await service.execute(req, user.userId);

      return ApiHelper.success(200, { success: true, message: 'Loan funded successfully' });
    } catch (error) {
      return ApiHelper.handleError(error);
    }
  };
