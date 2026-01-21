import type { Location } from '@/types';
import { cn } from '@/utils';

interface PlaceCardProps {
  location: Location;
  onClick?: () => void;
}

export const PlaceCard = ({ location, onClick }: PlaceCardProps) => {
  const category = location.categories[0] ?? '맛집';

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-shrink-0 w-32',
        'bg-[var(--bg-card)]',
        'border border-[var(--border-color)]',
        'rounded-2xl overflow-hidden',
        'text-left',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-[0_8px_20px_var(--shadow-color)]'
      )}
    >
      <img
        src={location.thumbnail}
        alt={location.name}
        className="w-full h-[70px] object-cover"
      />
      <div className="p-2.5">
        <h4 className="text-xs font-semibold text-[var(--text-primary)] truncate">
          {location.name}
        </h4>
        <p className="text-[10px] text-[var(--text-muted)] mt-1">
          {category}
        </p>
      </div>
    </button>
  );
};
