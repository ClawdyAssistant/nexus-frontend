/**
 * useAuth Hook
 * Authentication state and actions using React Query
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { User, LoginResponse } from '@/lib/api/types';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch current user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get<User>(API_ENDPOINTS.AUTH.ME),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials),
    onSuccess: (data) => {
      // Update cache with user data
      queryClient.setQueryData(['auth', 'me'], data.user);
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) =>
      api.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, data),
    onSuccess: (data) => {
      // Update cache with user data
      queryClient.setQueryData(['auth', 'me'], data.user);
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Redirect to login
      router.push('/login');
    },
  });

  return {
    // State
    user,
    isLoading,
    isAuthenticated: !!user,
    error,

    // Actions
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
