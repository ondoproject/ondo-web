export interface Location {
  id: number;
  sid: string;
  name: string;
  address: string | null;
  px: number; // longitude
  py: number; // latitude
  categories: string[];
  thumbnail: string;
  created_at: string;
  description?: string | null;
}
