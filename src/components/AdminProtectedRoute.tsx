
import { Navigate } from 'react-router-dom';
import { adminAuthService } from '@/services/adminAuthService';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const isAuthenticated = adminAuthService.isAdminAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
