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
  login: (credentials: { name: string; password?: string; roleToMock?: UserRole }) => void;
  logout: () => void;
  setRole: (role: UserRole) => void; // Kept for dev mode role switching
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (credentials) => {
        // Mocking the validation and response from POST /login
        const mockUser: User = {
          id: 1,
          name: credentials.name,
          lastname: 'Mock',
          role: credentials.roleToMock || 'Operador',
          area: 1,
        };
        
        set({
          user: mockUser,
          token: 'mock-jwt-token-abc123',
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

