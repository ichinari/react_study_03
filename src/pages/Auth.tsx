import { supabase } from '@api/supabase';
import { useState, useEffect, type FormEvent } from 'react';
import type { EmailOtpType, Session } from '@supabase/supabase-js';

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [session, setSession] = useState<Session | null>(null);
  const [password, setPassword] = useState<string>('');

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get('token_hash');

  const [verifying, setVerifying] = useState<boolean>(!!hasTokenHash);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Check if we have token_hash in URL (magic link callback)
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get('token_hash');
    const type = params.get('type') as EmailOtpType | null;

    if (token_hash && type) {
      // Verify the OTP token
      supabase.auth
        .verifyOtp({
          token_hash,
          type,
        })
        .then(({ error }) => {
          if (error) {
            setAuthError(error.message);
          } else {
            setAuthSuccess(true);
            // Clear URL params
            window.history.replaceState({}, document.title, '/');
          }
          setVerifying(false);
        });
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Auth error:', error);
      }

      setEmail('');
      setPassword('');

      alert('login success');
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      setSession(null);
      alert('logout success');
    } catch (err) {
      console.log(err);
    }
  };

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth error
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, '/');
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Show auth success (briefly before session loads)
  if (authSuccess && !session) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  // If user is logged in, show welcome screen
  if (session) {
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You are logged in as: {session.user.email}</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    );
  }

  // Show login form
  return (
    <div>
      <h1>Supabase + React</h1>
      <p>Sign in via magic link with your email below</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
  );
}
