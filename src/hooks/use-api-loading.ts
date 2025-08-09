import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface UseApiLoadingReturn {
  isLoading: boolean;
  activeEndpoints: string[];
}

/**
 * Hook to track API loading states
 * 
 * @param endpointFilter Optional filter to only track specific endpoints
 * @returns Object containing loading state and active endpoints
 */
export const useApiLoading = (endpointFilter?: string | RegExp): UseApiLoadingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(apiService.isLoading());
  const [activeEndpoints, setActiveEndpoints] = useState<string[]>(apiService.getActiveEndpoints());

  useEffect(() => {
    // Subscribe to loading state changes
    const unsubscribe = apiService.onLoadingChange((loading, endpoint) => {
      // If a filter is provided, only update state if the endpoint matches
      if (endpointFilter) {
        if (typeof endpointFilter === 'string' && endpoint === endpointFilter) {
          updateState();
        } else if (endpointFilter instanceof RegExp && endpointFilter.test(endpoint)) {
          updateState();
        }
      } else {
        // No filter, update for all endpoints
        updateState();
      }
    });

    // Helper to update both state values
    function updateState() {
      setIsLoading(apiService.isLoading());
      setActiveEndpoints(apiService.getActiveEndpoints());
    }

    // Initial state
    updateState();

    // Cleanup subscription
    return unsubscribe;
  }, [endpointFilter]);

  return { isLoading, activeEndpoints };
};

/**
 * Hook to track API loading state for a specific endpoint
 * 
 * @param endpoint The specific endpoint to track
 * @returns Boolean indicating if the endpoint is loading
 */
export const useEndpointLoading = (endpoint: string): boolean => {
  const { activeEndpoints } = useApiLoading();
  return activeEndpoints.includes(endpoint);
};