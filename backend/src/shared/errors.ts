export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvariantViolationError extends DomainError {
  constructor(message: string) {
    super(message, 'INVARIANT_VIOLATION', 400);
  }
}

export class IllegalStateTransitionError extends DomainError {
  constructor(message: string) {
    super(message, 'ILLEGAL_STATE_TRANSITION', 409);
  }
}

export class InsufficientFundsError extends DomainError {
  constructor(message: string) {
    super(message, 'INSUFFICIENT_FUNDS', 400);
  }
}

export class UnderwritingFailureError extends DomainError {
  constructor(message: string) {
    super(message, 'UNDERWRITING_FAILURE', 422);
  }
}
