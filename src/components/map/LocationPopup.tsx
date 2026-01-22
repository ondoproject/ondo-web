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
    /* 현재 네이버 지도 앱을 이용하지 않고 새탭을 열어서 사용 */
    const { px: dLongitude, py: dLatitude, name: dName } = location;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const sLatitude = pos.coords.latitude;
        const sLongitude = pos.coords.longitude;
        const url = `https://map.naver.com/p/directions/${sLongitude},${sLatitude},내위치/${dLongitude},${dLatitude},${encodeURIComponent(dName)}/-/walk`;
        window.open(url, '_blank');
      },
      () => {
        const url = `https://map.naver.com/p/directions/-,,/${dLongitude},${dLatitude},${encodeURIComponent(dName)}/-/walk`;
        window.open(url, '_blank');
      },
      { enableHighAccuracy: true, timeout: 3000 }
    );
  };

  return (
    <div className="w-full">
      {/*<img
        src={location.thumbnail}
        alt={location.name}
        className="w-full h-28 object-cover"
      />*/}
      <div className="flex flex-col py-2 px-4">
        <span className={cn('text-xs font-semibold uppercase tracking-wider py-2', style.textClass)}>
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
        <div className="flex flex-row justify-between flex-wrap items-center">
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
