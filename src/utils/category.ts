import type { Location } from '@/types';

export const extractCategories = (locations: Location[]): string[] => {
  const allCategories = locations.flatMap((loc) => loc.categories);
  return [...new Set(allCategories)];
};

export const transformEngCategory = (category: String) => {
  if (category === "맛집") return "Dining"
  if (category === "술집") return "Bar"
  if (category === "카페") return "Cafe"
  return "All"
}
