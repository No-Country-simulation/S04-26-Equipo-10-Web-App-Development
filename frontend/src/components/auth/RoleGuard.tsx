import { Navigate } from 'react-router-dom';
import { useAuthStore, type UserRole } from '../../store/authStore';
import type { ReactNode } from 'react';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallbackRoute?: string;
  redirectOnFail?: boolean;
}

export default function RoleGuard({
  allowedRoles,
  children,
  fallbackRoute = '/dashboard',
  redirectOnFail = false,
}: RoleGuardProps) {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    if (redirectOnFail) {
      return <Navigate to={fallbackRoute} replace />;
    }
    return null;
  }

  return <>{children}</>;
}
