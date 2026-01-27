import type { Location } from '@/types';
import { PlaceCard } from '../common/PlaceCard';
import BottomSheetLayout from './layout/BottomSheetLayout';

interface BottomSheetProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

export const BottomSheet = ({ locations, onLocationSelect }: BottomSheetProps) => {

  const handleCardClick = (location: Location) => {
    onLocationSelect(location);
  };

  return (
    <BottomSheetLayout>
      {/* Content */}
      <div className="mb-4">
        <p className="text-md text-[var(--accent-taupe)] font-bold">
          광안리 로컬들이 추천해요
        </p>
      </div>

      <div className="flex flex-col h-full overflow-y-auto pb-2 scrollbar-thin scrollbar-thumb-gradient">
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
