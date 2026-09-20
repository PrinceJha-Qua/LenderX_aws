import { getIdToken } from './auth';

const rawUrl = import.meta.env.VITE_API_ENDPOINT || 'https://gvdry8hj4c.execute-api.ap-south-1.amazonaws.com/prod';
const API_BASE_URL = rawUrl.replace(/\/+$/, '');

export interface CreateLoanRequest {
  amountCents: number; // Backend requires integer cents!
  termDays: number;
  purpose: string;
}

export interface FundLoanRequest {
  loanId: string;
  idempotencyKey?: string;
}

export interface RepayLoanRequest {
  loanId: string;
  amountCents: number;
  idempotencyKey?: string;
}

export interface LoanResponse {
  loanId: string;
  amount?: number;
  riskScore?: number | null;
  status?: string;
  [key: string]: unknown;
}

export interface UnderwriteResponse {
  message: string;
  loanId: string;
}

/**
 * Standardized fetch wrapper to handle backend JSON errors cleanly.
 */
const getErrorMessage = (data: unknown): string => {
  if (typeof data === 'object' && data !== null && 'message' in data && typeof data.message === 'string') {
    return data.message;
  }
  if (typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string') {
    return data.error;
  }
  return 'API request failed';
};

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getIdToken();
  if (!token) {
    throw new Error('Please sign in before using LenderX.');
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Unable to reach the LenderX API. Check your connection and try again.');
  }

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }
  if (!response.ok) throw new Error(getErrorMessage(data));
  return data as T;
}

// ----------------------------------------------------
// BORROWER ENDPOINTS
// ----------------------------------------------------

export function createLoan(payload: CreateLoanRequest): Promise<LoanResponse> {
  return fetchApi<LoanResponse>('/loans', {
    method: 'POST',
    body: JSON.stringify({
      amount: Math.trunc(payload.amountCents),
      termDays: payload.termDays,
      purpose: payload.purpose,
    }),
  });
}

export function underwriteLoan(loanId: string): Promise<UnderwriteResponse> {
  return fetchApi<UnderwriteResponse>('/loans/underwrite', {
    method: 'POST',
    body: JSON.stringify({ loanId }),
  });
}

export function repayLoan(payload: RepayLoanRequest): Promise<unknown> {
  return fetchApi('/loans/repay', {
    method: 'POST',
    body: JSON.stringify({
      loanId: payload.loanId,
      amount: Math.trunc(payload.amountCents),
      idempotencyKey: payload.idempotencyKey || crypto.randomUUID(),
    }),
  });
}

// ----------------------------------------------------
// LENDER ENDPOINTS
// ----------------------------------------------------

export function fundLoan(payload: FundLoanRequest): Promise<unknown> {
  return fetchApi('/loans/fund', {
    method: 'POST',
    body: JSON.stringify({
      loanId: payload.loanId,
      idempotencyKey: payload.idempotencyKey || crypto.randomUUID(),
    }),
  });
}
