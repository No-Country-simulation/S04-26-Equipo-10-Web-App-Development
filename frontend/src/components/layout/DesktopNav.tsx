import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROLE_NAVIGATION } from '../../config/navigation';

export default function DesktopNav() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  const links = ROLE_NAVIGATION[user.role];

  return (
    <nav className="w-full bg-[#0B1528] text-white shadow-md">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Left side: Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0FA968] rounded-xl flex-shrink-0" />
          <span className="text-xl font-medium tracking-wide">OpsCore</span>
        </div>

        {/* Center: Navigation Links (Desktop only) */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white border-b-2 border-white pb-1'
                    : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side: User & Logout (Desktop only) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-gray-400">{user.role}</span>
          </div>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Hamburger Menu (Mobile only) */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-white focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#1C2C45] bg-[#0B1528] px-4 py-4 pb-6 space-y-4">
          {/* Mobile User Info */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1C2C45]">
             <div className="flex flex-col">
               <span className="text-sm font-semibold text-white">{user.name}</span>
               <span className="text-xs text-gray-400">{user.role}</span>
             </div>
             <button
               onClick={logout}
               className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
             >
               <span>Salir</span>
               <LogOut size={18} />
             </button>
          </div>

          {/* Mobile Links */}
          {links.length > 0 && (
            <div className="flex flex-col space-y-2 pt-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#1C2C45] text-white'
                          : 'text-gray-400 hover:bg-[#1C2C45] hover:text-white'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
