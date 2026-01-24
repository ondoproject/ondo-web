import type { Location } from '@/types';
import { cn } from '@/utils';

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
        'flex flex-row w-full',
        'bg-[var(--bg-card)]',
        'border-t border-b border-[var(--border-color)]',
        'overflow-hidden',
        'text-left',
        'transition-all duration-300',
        'hover:shadow-[0_8px_20px_var(--shadow-color)]'
      )}
    >
      <img
        src={location.thumbnail}
        alt={location.name}
        className="w-[120px] h-[120px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] truncate">
          {location.name}
        </h2>
        <p className="text-[10px] text-[var(--text-muted)] mt-1">
          {category}
        </p>
      </div>
    </div>
  );
};
