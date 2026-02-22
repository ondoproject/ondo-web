import RouteButton from "@/components/common/RouteButton";
import BottomSheetLayout from "../../layout/BottomSheetLayout";
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
      <div className="flex flex-col items-center">
        {location.thumbnailUri && (
          <div className="w-full">
            <img 
              src={location.thumbnailUri}
              alt={location.name} 
              className="w-full h-[200px] rounded-lg object-cover shadow-lg" 
            />
          </div>
        )}
        <div className="pt-2 w-full">
          <h3 className="text-lg font-bold text-black">{location.name}</h3>
          <div className="flex justify-between pb-2 items-end border-b border-[var(--text-muted)]">
            <p className="text-sm text-black">{location.categories[1]}</p>
            <p className="text-xs text-black">{location.address}</p>
          </div>
          <div className="w-full flex flex-row justify-between text-black items-center gap-2">
            <div className="flex">
              <a href={`tel:${location.tel}`}>
                {location.tel ? (
                    <button className="px-4 py-2 bg-[var(--bg-accent)] text-white rounded-lg shadow-md hover:bg-[var(--bg-accent-hover)] transition-colors">
                      전화걸기
                    </button>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)]">전화번호 없음</p>
                  )
                }
              </a>
            </div>
            <RouteButton location={location} />
          </div>
          <div className="flex flex-row items-center justify-center gap-0.5">
            <img src="./logo.svg" className="w-8 h-8 rounded-full"/>
            <p className="flex flex-1 text-xs flex-wrap text-[var(--text-muted)]">
              {location.description === null || location.description === undefined ? "한줄 요약이 들어갈 자리 입니다." : location.description}
            </p>
          </div>
        </div>  
      </div>
    </BottomSheetLayout>
  );
};

export default PlaceDetailCard;