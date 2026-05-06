import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROLE_NAVIGATION } from '../../config/navigation';

export default function MobileNav() {
  const { user } = useAuthStore();

  if (!user) return null;

  const links = ROLE_NAVIGATION[user.role];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0B1528] border-t border-[#1C2C45] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full min-h-[48px] min-w-[48px] transition-colors ${
                  isActive ? 'text-[#0FA968]' : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <Icon size={24} className="mb-1" />
              <span className="text-[10px] font-medium text-center leading-tight">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
