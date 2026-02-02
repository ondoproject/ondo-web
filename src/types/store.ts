export interface Store {
  sid: string;
  name: string;
  address: string | null;
  description?: string | null;
  longitude: number;
  latitude: number;
  thumbnailUri: string;
  categories: string[];
}
