// LenderX API Service

// This pulls from the .env file we just created
const rawUrl = import.meta.env.VITE_API_URL || 'https://gvdry8hj4c.execute-api.ap-south-1.amazonaws.com/prod';
const API_BASE_URL = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

export interface CreateLoanRequest {
  amountCents: number; // Backend requires integer cents!
  termDays: number;
  purpose: string;
}

export interface FundLoanRequest {
  loanId: string;
}

export interface RepayLoanRequest {
  loanId: string;
  amountCents: number; // Backend requires integer cents!
}

/**
 * Standardized fetch wrapper to handle backend JSON errors cleanly.
 */
async function fetchApi(endpoint: string, options: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

// ----------------------------------------------------
// BORROWER ENDPOINTS
// ----------------------------------------------------

export async function createLoan(borrowerId: string, payload: CreateLoanRequest) {
  return fetchApi('/loans', {
    method: 'POST',
    headers: {
      'x-borrower-id': borrowerId, // Mock authentication header based on our backend design
    },
    body: JSON.stringify({
      amount: payload.amountCents,
      termDays: payload.termDays,
      purpose: payload.purpose
    }),
  });
}

export async function repayLoan(borrowerId: string, payload: RepayLoanRequest) {
  return fetchApi('/loans/repay', {
    method: 'POST',
    headers: {
      'x-borrower-id': borrowerId,
    },
    body: JSON.stringify({
      loanId: payload.loanId,
      amount: payload.amountCents
    }),
  });
}

// ----------------------------------------------------
// LENDER ENDPOINTS
// ----------------------------------------------------

export async function fundLoan(lenderId: string, payload: FundLoanRequest) {
  return fetchApi('/loans/fund', {
    method: 'POST',
    headers: {
      'x-lender-id': lenderId, // Mock authentication header based on our backend design
    },
    body: JSON.stringify({
      loanId: payload.loanId
    }),
  });
}
