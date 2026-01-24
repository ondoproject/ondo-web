import { ChevronUp } from 'lucide-react';
import { cn } from '@/utils';
import { useBottomSheet } from '@/hooks';
import type { Location } from '@/types';
import { PlaceCard } from './PlaceCard';

interface BottomSheetProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

export const BottomSheet = ({ locations, onLocationSelect }: BottomSheetProps) => {
  const { isCollapsed, toggle, handlers } = useBottomSheet();

  const handleCardClick = (location: Location) => {
    onLocationSelect(location);
  };

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0',
        'bg-[var(--bg-secondary)] backdrop-blur-lg',
        'rounded-t-3xl',
        'border-t border-[var(--border-color)]',
        'shadow-[0_-4px_30px_rgba(0,0,0,0.15)]',
        'z-[1000]',
        'transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isCollapsed && 'translate-y-[calc(100%-56px)]'
      )}
    >
      {/* Handle */}
      <div
        {...handlers}
        onClick={toggle}
        className="flex flex-col items-center py-3 px-5 cursor-grab active:cursor-grabbing"
      >
        <div
          className={cn(
            'w-10 h-1 rounded-full mb-1.5',
            'transition-all duration-300',
            isCollapsed 
              ? 'bg-accent-pink shadow-[0_0_10px_var(--shadow-color)]' 
              : 'bg-[var(--border-color)]'
          )}
        />
        <div
          className={cn(
            'flex items-center gap-1 text-[11px] text-[var(--text-muted)]',
            'transition-opacity duration-300',
            isCollapsed ? 'opacity-100' : 'opacity-0'
          )}
        >
          <ChevronUp className="w-3 h-3 animate-bounce-up" />
          위로 스와이프
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          'px-5 pb-6 overflow-hidden',
          'transition-all duration-400',
          isCollapsed ? 'opacity-0 max-h-0 pb-0' : 'opacity-100 max-h-[220px]'
        )}
      >
        <div className="mb-3.5">
          <p className="text-md text-[var(--accent-taupe)] font-bold">
            광안리 로컬들이 추천해요
          </p>
        </div>

        <div className="flex flex-col gap-3 overflow-x pb-2 scrollbar-thin scrollbar-thumb-gradient">
          {locations.slice(0, 10).map((location) => (
            <PlaceCard
              key={location.id}
              location={location}
              onClick={() => handleCardClick(location)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
