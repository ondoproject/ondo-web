import { Location } from "@/types";
import { cn, transformEngCategory } from "@/utils";
import RouteButton from "./RouteButton";

interface PlaceDetailCardProps {
  location: Location;
}

const PlaceDetailCard = ({ location }: PlaceDetailCardProps) => {
  if (!location) {
    console.log("데이터가 없어서 null 반환");
    return null;
  }

  console.log("렌더링 시도 중:", location.name);

  return (
    <div 
      className={cn(
        "flex flex-col px-4 py-4 w-full h-[300px]",
        "absolute bottom-0 left-0 right-0",
        "rounded-t-3xl z-[9999] bg-[var(--bg-secondary)]"
      )}
    >
      <div className="flex flex-col items-center pt-4">
        {location.thumbnail && (
          <img 
            src={location.thumbnail} 
            alt={location.name} 
            className="w-full h-40 rounded-lg object-cover" 
          />
        )}
        <div className="p-2 w-full">
          <h3 className="text-xl font-bold text-black">{location.name}</h3>
          <div className="flex justify-between mb-2 items-end border-b border-[var(--text-muted)]">
            <p className="text-md text-black">{transformEngCategory(location.categories[0])}</p>
            <p className="text-xs text-black">{location.address}</p>
          </div>
          <div className="w-full flex flex-row justify-around text-sm text-black items-center gap-2">
            <img src="./logo.svg" className="w-8 h-8 rounded-full"/>
            <p className="flex flex-1 text-xs text-[var(--text-muted)]">
              {location.description === null || location.description === undefined ? "한줄 요약이 들어갈 자리 입니다." : location.description}
            </p>
            <RouteButton location={location} />
          </div>
        </div>  
      </div>
    </div>
  );
};

export default PlaceDetailCard;