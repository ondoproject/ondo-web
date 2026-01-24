import type { Location } from '@/types';
import { cn, transformEngCategory } from '@/utils';
import { MoveRight } from 'lucide-react';

interface PlaceCardProps {
  location: Location;
  onClick?: () => void;
}

export const PlaceCard = ({ location, onClick }: PlaceCardProps) => {
  const category = location.categories[0] ?? '맛집';

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-row w-full items-center',
        'bg-[var(--bg-secondary)]',
        'border-t border-b border-[var(--text-muted)]',
        'text-left',
        'transition-all duration-300 cursor-pointer',
        'hover:shadow-[0_8px_20px_var(--shadow-color)]'
      )}
    >
      <img
        src={location.thumbnail}
        alt={location.name}
        className="w-[100px] h-[100px] object-cover"
      />
      <div className="p-4 flex flex-1 flex-col">
        <h2 className="text-lg font-bold text-black truncate">
          {location.name}
        </h2>
        <p className="text-md text-black pb-2 border-b border-[var(--text-muted)]">
          {transformEngCategory(category)}
        </p>
        <div className="pt-2 flex justify-between items-center gap-4 text-xs">
          <p className="text-black font-semibold">
            {location.address}
          </p>
          <div className="flex flex-row items-center gap-1 hover:scale-105 cursor-pointer">
            Directions <MoveRight size={12}/>
          </div>
        </div>
      </div>
    </div>
  );
};
