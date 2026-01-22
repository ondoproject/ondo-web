import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Location } from '@/types';
import { getCategoryStyle } from '@/constants';
import { LocationPopup } from './LocationPopup';
import { Beer, Coffee, UtensilsCrossed } from 'lucide-react';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';

interface LocationMarkerProps {
  location: Location;
  onSelect?: (location: Location) => void;
}

export const LocationMarker = ({ location, onSelect }: LocationMarkerProps) => {
  const category = location.categories[0] ?? '맛집';
  const style = getCategoryStyle(category)
  const container = useMemo(() => document.createElement('div'), []);

  const icon = useMemo(() => {
    return L.divIcon({
      className: 'custom-marker', 
      html: container, 
      iconSize: [40, 60],
      iconAnchor: [60, 60],
    });
  }, [container]);

  const IconComponent = (
    <div className="marker-pin animate-float">
      <div className={`marker-icon ${style.bgClass} border-2 ${style.borderClass} ${style.glowClass} flex items-center justify-center w-full h-full rounded-full`}>
        <span className={`${style.textClass}`}>
          {category === "맛집" && <UtensilsCrossed size={16} />}
          {category === "카페" && <Coffee size={16} />}
          {category === "술집" && <Beer size={16} />}
        </span>
      </div>
      <div className={`marker-glow absolute inset-0 -z-10 bg-${style.color}-500 opacity-20 blur-lg`}></div>
    </div>
  );

  return (
    <>
      <Marker
        position={[location.py, location.px]}
        icon={icon}
        eventHandlers={{
          click: () => onSelect?.(location),
        }}
      >
        <Popup>
          <div className="w-50 h-60">
            <LocationPopup location={location} />
          </div>
        </Popup>
      </Marker>
      {createPortal(IconComponent, container)}
    </>
  );
};
