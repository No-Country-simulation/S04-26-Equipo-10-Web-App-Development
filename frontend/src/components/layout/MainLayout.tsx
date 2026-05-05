import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { LogOut } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Por favor inicie sesión.</p>
      </div>
    );
  }

  const isDesktopRole = user.role === 'Gerente' || user.role === 'Supervisor' || user.role === 'Técnico';
  const isMobileRole = user.role === 'Operador';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Desktop Navigation for Gerente and Supervisor */}
      {isDesktopRole && <DesktopNav />}

      {/* Main Content Area */}
      {/* Add bottom padding on mobile to account for MobileNav */}
      <main className={`flex-1 overflow-y-auto ${isMobileRole ? 'pb-16 md:pb-0' : ''}`}>
        <div className="container mx-auto p-4 md:p-8">
          {/* Header for Mobile Operators to Logout easily if needed, since MobileNav doesn't have it by default */}
          {isMobileRole && (
            <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0FA968] rounded-lg" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600">
                <LogOut size={20} />
              </button>
            </div>
          )}
          {children}
        </div>
      </main>

      {/* Mobile Navigation for Operador and Técnico */}
      {isMobileRole && <MobileNav />}
    </div>
  );
}
