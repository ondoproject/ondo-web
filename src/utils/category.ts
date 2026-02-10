import type { Store } from '@/types';

export const extractCategories = (locations: Store[]): string[] => {
  const allCategories = locations.flatMap((loc) => loc.categories);
  return [...new Set(allCategories)];
};
