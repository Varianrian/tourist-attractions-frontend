import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { login as loginApi, getProfile } from '@/api/auth';
import type { User, LoginUser } from '@/types/user';
import { useRouter } from '@tanstack/react-router';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginUser) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!Cookies.get('token');

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      
      if (token) {
        try {
          const response = await getProfile();
          if (response.data?.data) {
            setUser(response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // Clear invalid token
          Cookies.remove('token');
          Cookies.remove('refreshToken');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginUser): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const response = await loginApi(credentials);
      
      if (!response.data.data?.access_token) {
        return { success: false, error: 'Invalid response from server' };
      }

      const { access_token } = response.data.data;

      // Store tokens
      Cookies.set('token', access_token, { expires: 7 }); // 7 days
      
      // Fetch user profile
      try {
        const profileResponse = await getProfile();
        if (profileResponse.data?.data) {
          console.log('User profile fetched successfully:', profileResponse.data.data);
          setUser(profileResponse.data.data);
        }
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
        
        return { success: true };
      } catch (profileError) {
        console.error('Failed to fetch user profile after login:', profileError);
        return { success: false, error: 'Failed to fetch user profile' };
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      const errorMessage = error?.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    window.location.href = '/admin';
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
