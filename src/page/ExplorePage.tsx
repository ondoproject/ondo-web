import ExploreMenuTab from "@/components/common/ExploreMenuTab";
import PlaceCard from "@/components/common/PlaceCard";
import { MAIN_CATEGORIES_IMGS } from "@/constants/categories";
import { useLocationContext } from "@/contexts/LocationContext";
import { useStoreFilter } from "@/hooks/useLoactionFilter";
import ScreenLayout from "@/layout/ScreenLayout";
import { Category } from "@/types/category";

const ExplorePage = ({}) => {
  const { stores, mainCategories, categories } = useLocationContext();
  const {
    filteredStores,
    selectedMainId,
    selectedViral,
    selectMainCategory,
    toggleViral
  } = useStoreFilter({ stores, categories });

  return (
    <ScreenLayout>
      <div className="flex flex-col w-full h-full justify-center items-center bg-[var(--bg-secondary)] p-4">
        <p className="text-lg mb-2">당신의 '온도'를 찾아보세요.</p>
        <div className="w-full flex flex-row flex-nowrap gap-2 overflow-x-auto py-4">
          <ExploreMenuTab 
            imageUrl="/viral_location.png"
            onSelect={toggleViral} 
            label={'Viral'} 
            isSelected={selectedViral} 
          />
          {mainCategories.map((category: Category) => {
            const categoryInfo = MAIN_CATEGORIES_IMGS.find(cat => cat.id === category.id);

            return (
              <ExploreMenuTab 
                imageUrl={categoryInfo?.image || '/default_location.png'}
                onSelect={() => selectMainCategory(category.id)} 
                label={category.name} isSelected={selectedMainId === category.id} 
              />
            );
          })}
        </div>
        <div className="w-full mt-2 flex-1 overflow-y-auto">
          {filteredStores.map((store) => (
            <PlaceCard key={store.sid} location={store} />
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}

export default ExplorePage;