import type { User } from '../store/authStore';

export interface LoginResponse {
  user: User;
  token: string;
}

// Whitelist of valid test users — only these can log in
const TEST_USERS: Record<string, { name: string; lastname: string; role: User['role'] }> = {
  'carlos.mendoza@planta.com':  { name: 'Carlos',  lastname: 'Mendoza', role: 'Operador'   },
  'roberto.sanchez@planta.com': { name: 'Roberto', lastname: 'Sánchez', role: 'Supervisor' },
  'ana.lopez@planta.com':       { name: 'Ana',     lastname: 'López',   role: 'Técnico'    },
  'elena.ramirez@planta.com':   { name: 'Elena',   lastname: 'Ramírez', role: 'Gerente'    },
};

export const authService = {
  login: async (email: string, password?: string): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const userInfo = TEST_USERS[normalizedEmail];

        if (!userInfo) {
          return reject(new Error('Usuario no encontrado. Usa uno de los correos de prueba.'));
        }

        if (password !== '123456') {
          return reject(new Error('Credenciales inválidas'));
        }

        resolve({
          user: {
            id: Object.keys(TEST_USERS).indexOf(normalizedEmail) + 1,
            name: userInfo.name,
            lastname: userInfo.lastname,
            role: userInfo.role,
          },
          token: `fake-jwt-token-${Date.now()}`,
        });
      }, 1000);
    });
  },
};
