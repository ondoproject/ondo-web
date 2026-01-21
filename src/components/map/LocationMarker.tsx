import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Location } from '@/types';
import { getCategoryStyle } from '@/constants';
import { LocationPopup } from './LocationPopup';

interface LocationMarkerProps {
  location: Location;
  onSelect?: (location: Location) => void;
}

const createMarkerIcon = (category: string) => {
  const style = getCategoryStyle(category);
  
  const html = `
    <div class="marker-pin animate-float">
      <div class="marker-icon ${style.bgClass} border-2 ${style.borderClass} ${style.glowClass}">
        <span class="${style.textClass}">📍</span>
      </div>
      <div class="marker-glow bg-gradient-radial from-${style.color}-500/80 to-transparent"></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker',
    html,
    iconSize: [50, 65],
    iconAnchor: [25, 65],
    popupAnchor: [0, -60],
  });
};

export const LocationMarker = ({ location, onSelect }: LocationMarkerProps) => {
  const category = location.categories[0] ?? '맛집';
  const icon = createMarkerIcon(category);

  return (
    <Marker
      position={[location.py, location.px]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect?.(location),
      }}
    >
      <Popup>
        <LocationPopup location={location} />
      </Popup>
    </Marker>
  );
};
