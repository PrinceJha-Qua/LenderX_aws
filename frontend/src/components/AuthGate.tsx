import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { getCurrentAuthenticatedUser, signIn } from '../services/auth';

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    getCurrentAuthenticatedUser().then((user) => setAuthenticated(Boolean(user)));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSigningIn(true);
    try {
      await signIn(email.trim(), password);
      setAuthenticated(true);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Unable to sign in.');
    } finally {
      setIsSigningIn(false);
    }
  };

  if (authenticated) return children;

  return (
    <div className="min-h-screen bg-[#091712] text-white flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#0e1f18] border border-[#163327] rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-[#34d399] text-xs font-bold uppercase tracking-widest mb-3">Secure LenderX Access</p>
          <h1 className="font-editorial text-4xl font-bold mb-3">Sign in to continue</h1>
          <p className="text-[#a7f3d0]/70 text-sm leading-relaxed">Use your Cognito account to access authenticated borrower and lender actions.</p>
        </div>
        <label className="block text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">Email</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="username" className="w-full bg-[#06120e] border border-[#163327] rounded-xl p-3 text-white mb-5 outline-none focus:border-[#10b981]" />
        <label className="block text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">Password</label>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required autoComplete="current-password" className="w-full bg-[#06120e] border border-[#163327] rounded-xl p-3 text-white mb-5 outline-none focus:border-[#10b981]" />
        {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
        <button type="submit" disabled={isSigningIn} className="w-full bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition">
          {isSigningIn ? 'Authenticating...' : 'Sign in securely'}
        </button>
      </form>
    </div>
  );
}
