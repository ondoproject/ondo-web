import type { Location } from '@/types';
import { getCategoryStyle } from '@/constants';
import { cn } from '@/utils';

interface LocationPopupProps {
  location: Location;
}

export const LocationPopup = ({ location }: LocationPopupProps) => {
  const category = location.categories[0] ?? '맛집';
  const style = getCategoryStyle(category);

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col p-4">
        <span className="text-base font-bold text-[var(--text-primary)]">
          {location.name}
        </span>
        {location.address && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
            {location.address}
          </p>
        )}
      </div>
    </div>
  );
};
