/**
 * Lead hooks using React Query
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Lead, PaginatedResponse } from '@/lib/api/types';

export function useLeads() {
  return useQuery<PaginatedResponse<Lead>>({
    queryKey: ['leads'],
    queryFn: () => api.get(API_ENDPOINTS.CRM.LEADS),
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Lead>) =>
      api.post<Lead>(API_ENDPOINTS.CRM.LEADS, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
