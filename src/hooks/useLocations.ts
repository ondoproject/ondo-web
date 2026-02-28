import {useCallback, useEffect, useMemo, useState} from 'react';
import type {Store} from '@/types';
import {Category} from "@/types/category.ts";
import {getCategories} from "@/api/categories.ts";
import {getStores} from "@/api";
import { CATEGORY_MAP } from '@/constants';

interface UseLocationsReturn {
  stores: Store[];
  mainCategories: Category[];
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

      const [storesData, categoriesData] = await Promise.all([
        getStores(),
        getCategories()
      ]);
      setStores(storesData);
      setCategories(categoriesData);

    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const mainCategories = useMemo(() => {
    const mainIds = Object.keys(CATEGORY_MAP).map(Number);
    return categories.filter(cat => mainIds.includes(cat.id));
  }, [categories]);

  useEffect(() => {
    loadLocations();
  }, []);

  return {
    stores: stores,
    mainCategories,
    categories,
    isLoading,
    error,
    refetch: loadLocations,
  };
};
