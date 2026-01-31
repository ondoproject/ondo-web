import { SearchModal, MapContainer, PlaceList } from "@/components";
import PlaceDetailCard from "@/components/bottomSheet/PlaceDetailCard";
import { CategoryPills } from "@/components/common/CategoryPills";
import { Header } from "@/components/common/Header";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useLocations } from "@/hooks";
import { Location } from "@/types";
import { cn } from "@/utils";
import { useMemo, useState } from "react";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const MainPage = () => {
  const { locations, categories, isLoading, error } = useLocations();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { expand, selectedLocation, setSelectedLocation } = useBottomSheet();

  const filteredLocations = useMemo(() => {
    let filtered = locations; 
    
    if (searchQuery) {
      setSelectedCategory('전체');

      const query = searchQuery.toLowerCase();
      
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query) ||
          loc.address?.toLowerCase().includes(query) ||
          loc.categories.some((cat) => cat.toLowerCase().includes(query))
      );
      
      setSelectedLocation(filtered.length > 0 ? filtered[0] : null);
    }

    if (selectedCategory !== '전체') {
      filtered = filtered.filter((loc) => loc.categories.includes(selectedCategory));
    }

    return filtered;
  }, [locations, selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedLocation(null);
    setSearchQuery('');
    expand(); 
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationSelect = (location: Location) => {
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
      "bg-[var(--bg-primary)] relative overflow-hidden isolation-auto transform-gpu",
    )}>
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      
      <CategoryPills
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <div className="relative h-[calc(var(--vh)*100-130px)]">
        <MapContainer
          locations={filteredLocations}
          onLocationSelect={handleLocationSelect}
        />

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

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default MainPage;