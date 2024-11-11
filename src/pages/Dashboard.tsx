import { useAuthStore } from '../stores/authStore';

export function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome, {user?.name}!
        </h1>
        <div className="prose">
          <p className="text-gray-600">
            You are logged in as a{' '}
            <span className="font-medium capitalize">{user?.role}</span> user.
          </p>
          {user?.role === 'admin' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h2 className="text-lg font-semibold text-blue-900">Admin </h2>
              <p className="text-blue-700">
                As an admin, you have access to all system features and can manage other users.
              </p>
            </div>
          )}
          {user?.role === 'manager' && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <h2 className="text-lg font-semibold text-green-900">Manager </h2>
              <p className="text-green-700">
                As a manager, you can oversee team activities and generate reports.
              </p>
            </div>
          )}
          {user?.role === 'user' && (
            <div className="mt-4 p-4 bg-purple-50 rounded-md">
              <h2 className="text-lg font-semibold text-purple-900">User </h2>
              <p className="text-red-700">
                As a user, you can access basic features and view your personal dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}