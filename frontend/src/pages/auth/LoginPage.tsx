import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Factory, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { loginSchema, type LoginFormData } from './loginSchema';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      setSession(response.user, response.token);
      toast.success('Sesión iniciada correctamente');
      
      // Role-based redirect
      switch (response.user.role) {
        case 'Operador':
          navigate('/reportar');
          break;
        case 'Técnico':
          navigate('/mis-tareas');
          break;
        case 'Supervisor':
          navigate('/reportes');
          break;
        case 'Gerente':
          navigate('/incidentes-asignados');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error de conexión con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1528] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="pt-8 pb-4 px-8 text-center">
          <div className="bg-[#0B1528] text-white w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Factory size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#0B1528]">OpsCore</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de Gestión de Incidentes</p>
        </div>

        {/* Form */}
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0B1528] font-medium">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@planta.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0B1528] font-medium">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0B1528] hover:bg-[#0B1528]/90 text-white py-6 rounded-lg text-base mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>
        </div>

        {/* Test Users Footer */}
        <div className="bg-gray-50 border-t border-gray-100 p-6 mt-4">
          <p className="text-xs text-center text-gray-500 mb-4 font-medium">Usuarios de prueba (contraseña: 123456)</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-bold text-[#0B1528] block">Operador:</span>
              <span className="text-gray-500">carlos.mendoza@planta.com</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-bold text-[#0B1528] block">Supervisor:</span>
              <span className="text-gray-500">roberto.sanchez@planta.com</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-bold text-[#0B1528] block">Técnico:</span>
              <span className="text-gray-500">ana.lopez@planta.com</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md">
              <span className="font-bold text-[#0B1528] block">Gerente:</span>
              <span className="text-gray-500">elena.ramirez@planta.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
