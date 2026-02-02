import {useEffect, useState} from 'react';
import type {Store} from '@/types';
import {Category} from "@/types/category.ts";
import {getCategories} from "@/api/categories.ts";
import {getStores} from "@/api";

interface UseLocationsReturn {
  stores: Store[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useLocations = (): UseLocationsReturn => {
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      setStores(await getStores());
      setCategories(await getCategories());
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
    stores: stores,
    categories,
    isLoading,
    error,
    refetch: loadLocations,
  };
};
