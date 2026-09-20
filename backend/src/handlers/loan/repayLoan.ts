import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { RepayLoanService } from '../../application/loans/RepayLoanService';
import { RepaymentSchema } from '../../shared/schemas';
import { ApiHelper } from '../../shared/ApiHelper';
import { getAuthenticatedUser, requireGroup } from '../../shared/auth';

export const makeRepayLoanHandler =
  (service: RepayLoanService) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const user = getAuthenticatedUser(event);
      if (!user) {
        return ApiHelper.success(401, { error: 'Unauthorized' });
      }
      if (!requireGroup(user, 'BORROWER')) {
        return ApiHelper.success(403, { error: 'Forbidden' });
      }

      const body = JSON.parse(event.body || '{}');
      const req = RepaymentSchema.parse(body);

      await service.execute(req, user.userId);

      return ApiHelper.success(200, { success: true, message: 'Repayment processed' });
    } catch (error) {
      return ApiHelper.handleError(error);
    }
  };
