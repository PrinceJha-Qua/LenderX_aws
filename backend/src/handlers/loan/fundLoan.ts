import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FundLoanService } from '../../application/funding/FundLoanService';
import { FundLoanSchema } from '../../shared/schemas';
import { ApiHelper } from '../../shared/ApiHelper';

export const makeFundLoanHandler =
  (service: FundLoanService) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');
      const req = FundLoanSchema.parse(body);

      // Execute the atomic funding logic
      await service.execute(req);

      return ApiHelper.success(200, { success: true, message: 'Loan funded successfully' });
    } catch (error) {
      return ApiHelper.handleError(error);
    }
  };
