import {
  APIGatewayProxyCognitoAuthorizer,
  APIGatewayProxyEvent,
} from 'aws-lambda';

export type CognitoRole = 'BORROWER' | 'LENDER';

export interface AuthenticatedUser {
  userId: string;
  groups: string[];
}

const parseGroups = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((group): group is string => typeof group === 'string');
  }

  if (typeof value !== 'string') {
    return [];
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(trimmedValue);
    if (Array.isArray(parsedValue)) {
      return parsedValue.filter((group): group is string => typeof group === 'string');
    }
  } catch {
    // API Gateway commonly exposes this claim as a plain string.
  }

  return trimmedValue
    .split(',')
    .map((group) => group.trim())
    .filter(Boolean);
};

export const getAuthenticatedUser = (
  event: APIGatewayProxyEvent,
): AuthenticatedUser | null => {
  const claims = (event.requestContext?.authorizer as
    | APIGatewayProxyCognitoAuthorizer
    | undefined)?.claims;
  const userId = claims?.sub;

  if (!claims || typeof userId !== 'string' || !userId.trim()) {
    return null;
  }

  return {
    userId,
    groups: parseGroups(claims['cognito:groups']),
  };
};

export const requireGroup = (
  user: AuthenticatedUser,
  group: CognitoRole,
): boolean => user.groups.includes(group);
