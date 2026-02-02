export interface Store {
  sid: string;
  name: string;
  address: string | null;
  longitude: number;
  latitude: number;
  categories: string[];
  thumbnailUri: string;
  description?: string | null;
}
