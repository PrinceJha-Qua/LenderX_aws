import { z } from 'zod';

// Strict validation schemas as per Engineering Contract §6.1

export const CreateLoanSchema = z.object({
  amount: z.number().int().min(100).max(50000000), // $1 to $500,000 in cents
  termDays: z.number().int().min(7).max(365),
  purpose: z.string().min(5).max(500),
  vendorName: z.string().max(200).optional(),
  vendorId: z.string().uuid().optional(),
});
export type CreateLoanRequest = z.infer<typeof CreateLoanSchema>;

export const FundLoanSchema = z.object({
  loanId: z.string().min(1),
  lenderId: z.string().min(1), // In reality, extracted from JWT
  idempotencyKey: z.string().uuid(),
});
export type FundLoanRequest = z.infer<typeof FundLoanSchema>;

export const RepaymentSchema = z.object({
  loanId: z.string().min(1),
  amount: z.number().int().min(1),
  idempotencyKey: z.string().uuid(),
});
export type RepaymentRequest = z.infer<typeof RepaymentSchema>;
