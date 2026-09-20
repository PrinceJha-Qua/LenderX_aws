import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UnderwriteLoanService } from '../../application/underwriting/UnderwriteLoanService';
import { ApiHelper } from '../../shared/ApiHelper';

export const makeUnderwriteLoanHandler =
  (service: UnderwriteLoanService) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const body = JSON.parse(event.body || '{}');

      if (!body.loanId || typeof body.loanId !== 'string') {
        throw new Error('Missing loanId');
      }

      await service.executeMock(body.loanId);

      return ApiHelper.success(200, {
        message: 'Loan approved using mock underwriting',
        loanId: body.loanId,
      });
    } catch (error) {
      return ApiHelper.handleError(error);
    }
  };
