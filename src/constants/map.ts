export const MAP_CONFIG = {
  center: [35.1531, 129.1186] as [number, number],
  zoom: 18,
  maxZoom: 20,
  minZoom: 16,
};

export const TILE_URLS = {
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};

export const TILE_ATTRIBUTION = '©OpenStreetMap, ©CartoDB';
