import { AlertTriangle, ClipboardList, LayoutDashboard, Users, Wrench } from 'lucide-react';
import type { UserRole } from '../store/authStore';

export interface NavItem {
  label: string;
  path: string;
  icon: any; // Lucide icon
}

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  Operador: [
    { label: 'Reportar incidente', path: '/reportar', icon: AlertTriangle },
    { label: 'Mis reportes', path: '/mis-reportes', icon: ClipboardList },
  ],
  Supervisor: [], // As per Figma feedback, no links
  Técnico: [
    { label: 'Mis tareas', path: '/mis-tareas', icon: Wrench },
  ],
  Gerente: [
    { label: 'Métricas de reportes', path: '/metricas-de-reportes', icon: LayoutDashboard },
    { label: 'Gestión de usuarios', path: '/usuarios', icon: Users },
  ],
};
