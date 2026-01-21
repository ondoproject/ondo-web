import { useState, useEffect } from 'react';
import { fetchLocations } from '@/api';
import { extractCategories } from '@/utils';
import type { Location } from '@/types';

interface UseLocationsReturn {
  locations: Location[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useLocations = (): UseLocationsReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchLocations();
      setLocations(data);
      setCategories(extractCategories(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return {
    locations,
    categories,
    isLoading,
    error,
    refetch: loadLocations,
  };
};
