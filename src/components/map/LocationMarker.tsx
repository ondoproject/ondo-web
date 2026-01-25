import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Location } from '@/types';
import { getCategoryStyle } from '@/constants';
import { LocationPopup } from './LocationPopup';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { MapPin } from 'lucide-react';

interface LocationMarkerProps {
  location: Location;
  onSelect?: (location: Location) => void;
  isSelected?: boolean;
}

export const LocationMarker = ({ location, onSelect, isSelected }: LocationMarkerProps) => {
  const category = location.categories[0] ?? '맛집';
  const style = getCategoryStyle(category)
  const container = useMemo(() => document.createElement('div'), []);

  const icon = useMemo(() => {
    return L.divIcon({
      className: "", 
      html: container, 
      iconAnchor: [16, 32],
      popupAnchor: [-8, -32],
    });
  }, [container, isSelected]);

  const IconComponent = isSelected ? (
    <div className="relative flex flex-col items-center">
      <MapPin className="w-12 h-12 drop-shadow-lg animate-bounce" style={{ color: `${style.color}` }} />
    </div>
  ) : (
    <div className="relative flex flex-col items-center animate-float">
      <div className="relative w-4 h-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full shadow-md" />
        <div className="absolute -bottom-1 w-4 h-4 rotate-45" />
        <div className={`absolute w-6 h-6 rounded-full border-2 bg-white ${style.borderClass} z-10 flex items-center justify-center`}>
          <div className="w-full h-full rounded-full border-[#634E3C]" />
        </div>
      </div>
      <div className="w-6 h-2 bg-black/20 rounded-[100%] blur-[1px] mt-1.5" />
      <div className={`absolute inset-0 -z-10 ${style.glowClass} opacity-30 blur-xl`}></div>
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
          <LocationPopup location={location} />
        </Popup>
      </Marker>
      {createPortal(IconComponent, container)}
    </>
  );
};
