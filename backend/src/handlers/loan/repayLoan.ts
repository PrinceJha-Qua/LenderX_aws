import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { RepayLoanService } from '../../application/loans/RepayLoanService';
import { RepaymentSchema } from '../../shared/schemas';
import { ApiHelper } from '../../shared/ApiHelper';

export const makeRepayLoanHandler =
  (service: RepayLoanService) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');
      const req = RepaymentSchema.parse(body);

      const borrowerId = event.headers['x-borrower-id'];
      if (!borrowerId) {
        return ApiHelper.handleError(new Error('Missing x-borrower-id header'));
      }

      await service.execute(req, borrowerId);

      return ApiHelper.success(200, { success: true, message: 'Repayment processed' });
    } catch (error) {
      return ApiHelper.handleError(error);
    }
  };
