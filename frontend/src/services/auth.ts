import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

const poolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

if (!poolId || !clientId) {
  throw new Error('Cognito configuration is missing.');
}

const userPool = new CognitoUserPool({
  UserPoolId: poolId,
  ClientId: clientId,
});

const getCurrentUser = (): CognitoUser | null => userPool.getCurrentUser();

export const getIdToken = (): Promise<string | null> => {
  const user = getCurrentUser();
  if (!user) return Promise.resolve(null);

  return new Promise((resolve) => {
    user.getSession((error: Error | null, session: CognitoUserSession | null) => {
      resolve(!error && session?.isValid() ? session.getIdToken().getJwtToken() : null);
    });
  });
};

export const getCurrentAuthenticatedUser = (): Promise<CognitoUser | null> =>
  new Promise((resolve) => {
    const user = getCurrentUser();
    if (!user) {
      resolve(null);
      return;
    }
    user.getSession((error: Error | null, session: CognitoUserSession | null) => {
      resolve(!error && session?.isValid() ? user : null);
    });
  });

export const signIn = (username: string, password: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: username, Pool: userPool });
    user.authenticateUser(new AuthenticationDetails({ Username: username, Password: password }), {
      onSuccess: () => resolve(),
      onFailure: reject,
    });
  });

export const signOut = (): void => {
  getCurrentUser()?.signOut();
};

export const hasAuthenticatedUser = (): boolean => getCurrentUser() !== null;
