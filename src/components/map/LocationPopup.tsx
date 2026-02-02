import type { Store } from '@/types';

interface LocationPopupProps {
  location: Store;
}

export const LocationPopup = ({ location }: LocationPopupProps) => {

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
