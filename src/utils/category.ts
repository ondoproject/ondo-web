import type { Location } from '@/types';

export const extractCategories = (locations: Location[]): string[] => {
  const allCategories = locations.flatMap((loc) => loc.categories);
  return [...new Set(allCategories)];
};
