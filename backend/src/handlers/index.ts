import { UnderwriteLoanService } from '../application/underwriting/UnderwriteLoanService';
import { makeUnderwriteLoanHandler } from './loan/underwriteLoan';

import { Money } from '../shared/Money';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

import { DynamoDbLoanRepository } from '../infrastructure/dynamodb/DynamoDbLoanRepository';
import { CreateLoanService } from '../application/loans/CreateLoanService';
import { FundLoanService } from '../application/funding/FundLoanService';
import { RepayLoanService } from '../application/loans/RepayLoanService';

import { makeCreateLoanHandler } from './loan/createLoan';
import { makeFundLoanHandler } from './loan/fundLoan';
import { makeRepayLoanHandler } from './loan/repayLoan';

// 1. Initialize AWS SDK Clients
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// 2. Read Environment Variables injected by CDK
const tableName = process.env.TABLE_NAME || 'LenderXTable';

// 3. Initialize Repositories
const loanRepo = new DynamoDbLoanRepository(docClient, tableName);

// For the hackathon, we are mocking the minor repositories to save time and focus on the core Loan logic.
// In a full build, these would be separate DynamoDb classes.
const mockBorrowerRepo = { 
  getLevel: async () => 1, 
  getActiveLoanCount: async () => 0 
};
const mockLenderRepo = { 
  getById: async (id: string) => ({
    id,
    balance: Money.fromDollars(100000),
  })
};
const mockAuditRepo = { 
  record: async (event: any) => console.log('[AUDIT RECORDED]', event) 
};

// 4. Initialize Application Services (Dependency Injection)
const createLoanService = new CreateLoanService(loanRepo, mockBorrowerRepo);
const fundLoanService = new FundLoanService(loanRepo, mockLenderRepo, mockAuditRepo);
const repayLoanService = new RepayLoanService(loanRepo, mockAuditRepo);
const underwriteLoanService = new UnderwriteLoanService(
  loanRepo,
  mockBorrowerRepo,
  {} as any,
  {} as any,
);

// 5. Export the Final Lambda Handlers
export const createLoan = makeCreateLoanHandler(createLoanService);
export const fundLoan = makeFundLoanHandler(fundLoanService);
export const repayLoan = makeRepayLoanHandler(repayLoanService);
export const underwriteLoan = makeUnderwriteLoanHandler(underwriteLoanService);