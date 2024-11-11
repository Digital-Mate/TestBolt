import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Unauthorized } from './pages/Unauthorized';
import { AuthGuard } from './components/AuthGuard';
import { Navbar } from './components/Navbar';
import { useAuthStore } from './stores/authStore';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } />
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;