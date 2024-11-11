import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Unauthorized Access</h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block text-blue-600 hover:text-blue-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}