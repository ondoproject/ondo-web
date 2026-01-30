import type { Location } from '@/types';
import { PlaceCard } from '../common/PlaceCard';
import BottomSheetLayout from './layout/BottomSheetLayout';

interface PlaceListProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

export const PlaceList = ({ locations, onLocationSelect }: PlaceListProps) => {

  const handleCardClick = (location: Location) => {
    onLocationSelect(location);
  };

  return (
    <BottomSheetLayout>
      {/* Content */}
      <div className="mb-4 flex-shrink-0">
        <p className="text-md text-[var(--accent-taupe)] font-bold">
          광안리 로컬들이 추천해요
        </p>
      </div>

      <div className="flex flex-col min-h-0 overflow-y-auto pb-2 scrollbar-thin scrollbar-thumb-gradient">
        {locations.map((location) => (
          <PlaceCard
            key={location.id}
            location={location}
            onClick={() => handleCardClick(location)}
          />
        ))}
      </div>
    </BottomSheetLayout>
  );
};
