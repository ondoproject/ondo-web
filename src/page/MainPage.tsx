import { MapContainer, PlaceList } from "@/components";
import PlaceDetailCard from "@/components/bottomSheet/PlaceDetailCard";
import { CategoryPills } from "@/components/common/CategoryPills";
import { Header } from "@/components/common/Header";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useLocations } from "@/hooks";
import { Store } from "@/types";
import { cn } from "@/utils";
import { useMemo, useState } from "react";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { CATEGORY_MAP } from "@/constants/categories";
import SubCategoryPills from "@/components/common/SubCategoryPills";

const MainPage = () => {
  const { stores, categories, mainCategories, isLoading, error } = useLocations();
  const { expand, selectedLocation, setSelectedLocation } = useBottomSheet();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState<String | null>('');
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    let filtered = stores;
    
    if (searchQuery) {
      setSelectedCategory('ALL');

      const query = searchQuery.toLowerCase();
      
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query) ||
          loc.address?.toLowerCase().includes(query) ||
          loc.categories.some((cat) => cat.toLowerCase().includes(query))
      );
      
      setSelectedLocation(filtered.length > 0 ? filtered[0] : null);
    }

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter((loc) => loc.categories.includes(selectedCategory));
    }

    return filtered;
  }, [stores, selectedCategory, searchQuery]);

  const subCategories = useMemo(() => {
    if (!selectedMainCategoryId) return [];

    const subIds = CATEGORY_MAP[selectedMainCategoryId] || [];
    const subCategories = categories.filter(cat => subIds.includes(cat.id));

    return subCategories;
  }, [selectedMainCategoryId, categories]);
  
  const handleCategorySelect = (category: string) => {
    const categoryObj = categories.find(cat => cat.name === category);
    const isMainCategory = mainCategories.some(mainCat => mainCat.name === category);

    if (isMainCategory || category === 'ALL') {
      setSelectedCategory(category);
      setSelectedSubCategory(null); 
      setSelectedMainCategoryId(category === 'ALL' ? null : categoryObj?.id || null);
    } else {
      setSelectedSubCategory(category);
    }
    
    setSelectedCategory(category);
    setSelectedLocation(null);
    setSearchQuery('');
    expand(); 
  }; 

  const handleLocationSelect = (location: Store) => {
    setSearchQuery('');
    setSelectedLocation(location);
    expand();
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className={cn(
      "max-w-[430px] mx-auto h-[calc(var(--vh)*100)] min-h-screen",
      "bg-[var(--bg-primary)] relative",
    )}>
      <Header />
      
      <CategoryPills
        categories={mainCategories}
        selected={selectedCategory}
        selectedMainCategoryId={selectedMainCategoryId}
        onSelect={handleCategorySelect}
      />

      <div className="relative h-[calc(var(--vh)*100-130px)]">
        <MapContainer
          locations={filteredLocations}
          onLocationSelect={handleLocationSelect}
        />

        {selectedMainCategoryId !== null && subCategories.length > 0 && 
          <SubCategoryPills
            subCategories={subCategories}
            selectedCategory={selectedSubCategory}
            onSelect={handleCategorySelect}
          />
        }

        {
          selectedLocation !== null ? (
            <PlaceDetailCard />
          ) : (
            <PlaceList
              locations={filteredLocations}
              onLocationSelect={handleLocationSelect}
            />
          )
        } 
      </div>
    </div>
  );
};

export default MainPage;