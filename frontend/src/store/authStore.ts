import { create } from 'zustand';

export type Role = 'Operador' | 'Supervisor' | 'Técnico' | 'Gerente';

interface User {
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  setRole: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Default to Operador for initial testing
  user: { name: 'Alex Sterling', role: 'Operador' },
  setRole: (role: Role) => set((state) => ({ user: state.user ? { ...state.user, role } : { name: 'Alex Sterling', role } })),
  logout: () => set({ user: null }),
}));
