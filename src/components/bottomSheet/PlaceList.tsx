import type { Store } from '@/types';
import PlaceCard from '../common/PlaceCard';
import BottomSheetLayout from '../../layout/BottomSheetLayout';
import { cn } from '@/utils/cn';

interface PlaceListProps {
  locations: Store[];
  onLocationSelect: (location: Store) => void;
}

export const PlaceList = ({ locations, onLocationSelect }: PlaceListProps) => {

  const handleCardClick = (location: Store) => {
    onLocationSelect(location);
  };

  return (
    <BottomSheetLayout>
      {/* Content */}
      <div className="mb-4 flex-shrink-0">
        <p className="mt-2 text-md text-[var(--accent-taupe)] font-bold">
          광안리 로컬들이 추천해요
        </p>
      </div>

      <div className={cn(
                        "flex flex-col items-stretch min-h-0 overflow-y-auto",
                        "pb-2 scrollbar-thin scrollbar-thumb-gradient"
                      )}>
        {locations.length === 0 ? (
          <div className="flex flex-col flex-1 h-full gap-4 text-[var(--text-muted)] py-20 items-center justify-center">
            <p>추천해줄 장소가 아직은 존재하지 않아요</p>
            <p>더 많은 좋은 장소들을 추가해 놓을게요</p>
          </div>
        ) : (
          locations.map((location) => (
            <PlaceCard
              key={location.sid}
              location={location}
            onClick={() => handleCardClick(location)}
          />
        )))}
      </div>
    </BottomSheetLayout>
  );
};
