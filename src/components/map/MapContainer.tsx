import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';
import { useTheme } from '@/contexts';
import { MAP_CONFIG, TILE_URLS, TILE_ATTRIBUTION } from '@/constants';
import type { Location } from '@/types';
import { LocationMarker } from './LocationMarker';

interface MapContainerProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
  selectedLocation?: Location | null;
}

// 타일 레이어를 동적으로 변경하기 위한 컴포넌트
const TileLayerSwitcher = () => {
  const { isDark } = useTheme();
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return (
    <TileLayer
      key={isDark ? 'dark' : 'light'}
      attribution={TILE_ATTRIBUTION}
      url={isDark ? TILE_URLS.dark : TILE_URLS.light}
      maxZoom={MAP_CONFIG.maxZoom}
    />
  );
};

// 지도 중심 이동 컴포넌트
const MapController = ({ selectedLocation }: { selectedLocation?: Location | null }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.py, selectedLocation.px], 17, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [map, selectedLocation]);

  return null;
};

export const MapContainer = ({ locations, onLocationSelect, selectedLocation }: MapContainerProps) => {

  return (
    <div className="relative h-full w-full">
      <LeafletMapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        zoomControl={false}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayerSwitcher />
        <MapController selectedLocation={selectedLocation} />
        
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onSelect={onLocationSelect}
            isSelected={selectedLocation?.id === location.id}
          />
        ))}
      </LeafletMapContainer>
    </div>
  );
};
