import { useState } from 'react';
function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {};
  return (
    <>
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
      </form>
      <button>Login</button>
    </>
  );
}

export default Login;
