import ExploreMenuTab from "@/components/common/ExploreMenuTab";
import { useLocations } from "@/hooks/useLocations";
import ScreenLayout from "@/layout/ScreenLayout";
import { Category } from "@/types/category";

const ExplorePage = ({}) => {
  const { stores ,categories } = useLocations();

  const handleViralClick = () => {
    stores.filter((store) => store.isViral !== true);
  }; 

  const handleCategoryClick = (category: string) => {
    stores.filter((store) => store.categories.includes(category));
  };

  return (
    <ScreenLayout>
        <div className="w-full h-full justify-center items-center bg-[var(--bg-secondary)]">
          <div className="flex w-full">
            <ExploreMenuTab onSelect={handleViralClick} menu={'Viral'} />
            {categories.map((category: Category) => (
              <ExploreMenuTab onSelect={handleCategoryClick} menu={category.name} />
            ))}
          </div>
        </div>
    </ScreenLayout>
  );
}

export default ExplorePage;