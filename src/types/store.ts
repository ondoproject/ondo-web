export interface Store {
  sid: string;
  name: string;
  address: string | null;
  description?: string | null;
  longitude: number; // longitude
  latitude: number; // latitude
  thumbnail_key: string;
  created_at: string;
}
