import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from '@/components/auth/Login';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    // Redirect to dashboard if already authenticated
    const token = Cookies.get('token');
    if (token) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: Login,
});
