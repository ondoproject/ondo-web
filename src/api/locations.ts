import { apiClient } from './client';
import type { Location } from '@/types';

export const fetchLocations = async (): Promise<Location[]> => {
  const { data } = await apiClient.get<Location[]>('/locations');
  return data;
};
