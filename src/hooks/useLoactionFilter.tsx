import { useMemo, useState, useCallback } from 'react';
import type { Store } from '@/types';
import type { Category } from '@/types/category';
import { CATEGORY_MAP } from '@/constants';

interface UseStoreFilterParams {
  stores: Store[];
  categories: Category[];
}

export const useStoreFilter = ({ stores, categories }: UseStoreFilterParams) => {
  const [selectedMainId, setSelectedMainId] = useState<number | null>(null);
  const [selectedSubId, setSelectedSubId] = useState<number | null>(null);
  const [selectedViral, setSelectedViral] = useState<boolean>(false);

  const getCategoryName = useCallback(
    (id: number): string | undefined => {
      return categories.find(cat => cat.id === id)?.name;
    },
    [categories]
  );

  const subCategories = useMemo(() => {
    if (selectedMainId === null) return [];
    const subIds = CATEGORY_MAP[selectedMainId] ?? [];
    return categories.filter(cat => subIds.includes(cat.id));
  }, [selectedMainId, categories]);

  const filteredStores = useMemo(() => {
    let results = stores;

    if (selectedViral) {
        results = results.filter(store => store.isViral);
    }

    if (selectedMainId !== null) {
      const mainName = getCategoryName(selectedMainId);
      
      if (mainName) {
        results = results.filter(store =>
          store.categories.includes(mainName)
        );
      }

      if (selectedSubId !== null) {
        const subName = getCategoryName(selectedSubId);
        if (subName) {
          results = results.filter(store =>
            store.categories.includes(subName)
          );
        }
      }
    }

    return results;
  }, [stores, selectedMainId, selectedSubId, selectedViral, getCategoryName]);

  const selectMainCategory = useCallback((id: number | null) => {
    setSelectedMainId(id);
    setSelectedSubId(null);
    setSelectedViral(false);   
  }, []);

  const toggleViral = useCallback(() => {
    setSelectedViral(prev => !prev);
    setSelectedMainId(null);  
    setSelectedSubId(null);
  }, []);

  const selectSubCategory = useCallback((id: number | null) => {
    setSelectedSubId(id);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedMainId(null);
    setSelectedSubId(null);
  }, []);

  return {
    filteredStores,
    selectedMainId,
    selectedSubId,
    selectedViral,
    subCategories,
    selectMainCategory,
    toggleViral,
    selectSubCategory,
    resetFilters,
  };
};