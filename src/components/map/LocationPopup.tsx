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
    <div className="flex-1 w-full">
      <img
        src={location.thumbnail}
        alt={location.name}
        className="w-full h-28 object-cover"
      />
      <div className="flex flex-col py-2 px-4">
        <span className={cn('text-xs font-semibold uppercase tracking-wider', style.textClass)}>
          {category}
        </span>
        <span className="text-base font-bold text-[var(--text-primary)]">
          {location.name}
        </span>
        {location.address && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
            {location.address}
          </p>
        )}
        <div className="flex flex-row justify-between flex-wrap items-center pb-4">
          <div>
            {location.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] rounded-lg bg-accent-pink/10 text-accent-pink"
              >
                #{cat}
              </span>
            ))}
          </div>
          <div>
            <button
              className={cn(
                  'w-full p-2 rounded-lg',
                  'bg-gradient-to-r from-accent-pink/30 to-accent-purple/30',
                  'text-black text-xs font-semibold',
                  'transition-all duration-300',
                  'hover:scale-110'
                )}
                onClick={navigateLocate}
            >
              ℹ️ 길찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
