import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';
import { useTheme } from '@/contexts';
import { MAP_CONFIG, TILE_URLS, TILE_ATTRIBUTION } from '@/constants';
import type { Location } from '@/types';
import { LocationMarker } from './LocationMarker';
import { useBottomSheet } from '@/contexts/BottomSheetContext';

interface MapContainerProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
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
const MapController = () => {
  const map = useMap();
  const { selectedLocation, isCollapsed } = useBottomSheet();

  useEffect(() => {
    if (!selectedLocation) {
      map.closePopup();
      return;
    }

    const timeoutId = setTimeout(() => {
      const currentZoom = map.getZoom();
      const latlng: [number, number] = [selectedLocation.py, selectedLocation.px];

      if (!isCollapsed) {
        // 계산 전 지도의 크기를 재계산하도록 강제 (중요!)
        map.invalidateSize(); 

        // 현재 시점의 정확한 컨테이너 포인트 추출
        const point = map.latLngToContainerPoint(latlng);
        point.y += 160; 
        
        const adjustedLatLng = map.containerPointToLatLng(point);
        map.setView(adjustedLatLng, currentZoom, {
          animate: true,
          duration: 0.5,
        });
      } else {
        map.setView(latlng, currentZoom, {
          animate: true,
          duration: 0.5,
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [map, selectedLocation, isCollapsed]);
  
  return null;
};

export const MapContainer = ({ locations, onLocationSelect }: MapContainerProps) => {

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
        <MapController />
        
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onSelect={onLocationSelect}
          />
        ))}
      </LeafletMapContainer>
    </div>
  );
};
