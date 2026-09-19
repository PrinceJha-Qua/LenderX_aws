import { CheckLoanDefaultService } from '../../application/lifecycle/CheckLoanDefaultService';

export interface StepFunctionEvent {
  loanId: string;
  termDays: number;
}

export const makeCheckDefaultHandler =
  (service: CheckLoanDefaultService) =>
  async (event: StepFunctionEvent): Promise<void> => {
    if (!event.loanId) {
      console.error('Invalid Step Function payload. Missing loanId.');
      return;
    }

    console.log(`[Lifecycle Engine] Waking up to check loan: ${event.loanId}`);

    try {
      await service.execute(event.loanId);
      console.log(`[Lifecycle Engine] Check complete for loan: ${event.loanId}`);
    } catch (error) {
      console.error(`[Lifecycle Engine] Error processing loan ${event.loanId}:`, error);
      throw error; // Let Step Functions catch the error for retries
    }
  };
