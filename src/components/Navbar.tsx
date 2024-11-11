import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              M3 Auth
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 p-1 rounded-full bg-gray-100" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}