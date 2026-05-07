import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Operador' | 'Supervisor' | 'Técnico' | 'Gerente';

export interface User {
  id: number;
  name: string;
  lastname: string;
  role: UserRole;
  area?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, token: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void; // Kept for dev mode role switching
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setSession: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      // Dev tool to quick switch role without relogging
      setRole: (role) => 
        set((state) => ({ 
          user: state.user ? { ...state.user, role } : null 
        })),
    }),
    {
      name: 'opscore-auth', // localStorage key
    }
  )
);

