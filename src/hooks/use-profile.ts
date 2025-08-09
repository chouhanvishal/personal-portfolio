import { useQuery } from '@tanstack/react-query';
import { apiService, ProfileData } from '@/services/api';

export const useProfile = () => {
  return useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: () => apiService.getProfile(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
}; 