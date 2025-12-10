import { useState, type FormEvent } from 'react';
import { supabase } from '@api/supabase';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-3">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-1.5 rounded-md"
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-1.5 rounded-md"
        />
        <button
          disabled={loading}
          className="border border-blue-200 bg-blue-200 p-1.5 rounded-md"
        >
          {loading ? <span>Loading</span> : <span>Login</span>}
        </button>
      </form>
    </>
  );
}
export default Login;
