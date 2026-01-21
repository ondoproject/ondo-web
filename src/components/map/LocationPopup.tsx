import type { Location } from '@/types';
import { getCategoryStyle } from '@/constants';
import { cn } from '@/utils';

interface LocationPopupProps {
  location: Location;
}

export const LocationPopup = ({ location }: LocationPopupProps) => {
  const category = location.categories[0] ?? '맛집';
  const style = getCategoryStyle(category);

  const navigateLocate = () => {
    /* 
      네이버 길찾기 링크
      https://map.naver.com/p/directions/14356526.4200537,4178357.2034575,153%EA%B5%AC%ED%8F%AC%EA%B5%AD%EC%88%98%20%ED%95%98%EB%8B%A8%EC%A0%90,1773391698,PLACE_POI/-/-/car?c=14.00,0,0,0,dh
    */
  }

  return (
    <div className="w-[220px]">
      <img
        src={location.thumbnail}
        alt={location.name}
        className="w-full h-28 object-cover"
      />
      <div className="p-3">
        <span className={cn('text-[10px] font-semibold uppercase tracking-wider', style.textClass)}>
          {category}
        </span>
        <h3 className="text-base font-bold text-[var(--text-primary)] mt-1">
          {location.name}
        </h3>
        {location.address && (
          <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2">
            {location.address}
          </p>
        )}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {location.categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] px-2 py-1 rounded-lg bg-accent-pink/10 text-accent-pink"
            >
              #{cat}
            </span>
          ))}
        </div>
        <button
          className={cn(
            'w-full mt-3 py-2 rounded-lg',
            'bg-gradient-to-r from-accent-pink/30 to-accent-purple/30',
            'text-black text-xs font-semibold',
            'transition-all duration-300',
            'hover:shadow-[0_4px_15px_var(--shadow-color)]'
          )}
          onClick={navigateLocate}
        >
          🧭 길찾기
        </button>
      </div>
    </div>
  );
};
