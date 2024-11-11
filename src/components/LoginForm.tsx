import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
        <p className="mt-2 text-sm text-gray-600">
          Demo accounts:
        </p>
        <div className="mt-1 text-xs text-gray-500 space-y-1">
          <p>admin@example.com / admin123</p>
          <p>manager@example.com / manager123</p>
          <p>user@example.com / user123</p>
        </div>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              disabled={isLoading}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              disabled={isLoading}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}