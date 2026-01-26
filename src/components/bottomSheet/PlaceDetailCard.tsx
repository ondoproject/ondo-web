import { transformEngCategory } from "@/utils";
import RouteButton from "@/components/common/RouteButton";
import BottomSheetLayout from "./layout/BottomSheetLayout";
import { useBottomSheet } from "@/contexts/BottomSheetContext";

interface PlaceDetailCardProps {}

const PlaceDetailCard = ({}: PlaceDetailCardProps) => {
  const { selectedLocation: location } = useBottomSheet();
  if (!location) {
    console.log("데이터가 없어서 null 반환");
    return null;
  }

  return (
    <BottomSheetLayout>
      <div className="flex flex-col items-center px-4">
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
    </BottomSheetLayout>
  );
};

export default PlaceDetailCard;