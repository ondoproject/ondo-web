import { apiClient } from './client';
import type { Store } from '@/types';

export const getStores = async (): Promise<Store[]> => {
  const { data } = await apiClient.get<Store[]>('/v1/stores');
  return data;
};
