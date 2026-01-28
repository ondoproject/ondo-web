import { BottomSheet, SearchModal, MapContainer } from "@/components";
import PlaceDetailCard from "@/components/bottomSheet/PlaceDetailCard";
import { CategoryPills } from "@/components/common/CategoryPills";
import { Header } from "@/components/common/Header";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useLocations } from "@/hooks";
import { Location } from "@/types";
import { cn } from "@/utils";
import { useMemo, useState } from "react";

const MainPage = () => {
  const { locations, categories, isLoading, error } = useLocations();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { expand, selectedLocation, setSelectedLocation } = useBottomSheet();

  const filteredLocations = useMemo(() => {
    let filtered = locations;

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((loc) => loc.categories.includes(selectedCategory));
    }

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (loc) =>
          loc.name.toLowerCase().includes(query) ||
          loc.address?.toLowerCase().includes(query) ||
          loc.categories.some((cat) => cat.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [locations, selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedLocation(null);
    expand(); 
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    expand();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🌡️</div>
          <p className="text-[var(--text-secondary)]">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <div className="text-4xl mb-4">😢</div>
          <p className="text-[var(--text-secondary)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "max-w-[430px] mx-auto h-[100dvh] min-h-screen", 
      "bg-[var(--bg-primary)] relative overflow-hidden isolation-auto transform-gpu",
    )}>
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      
      <CategoryPills
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <div className="relative h-[calc(100vh-130px)]">
        <MapContainer
          locations={filteredLocations}
          onLocationSelect={handleLocationSelect}
        />

        {
          selectedLocation !== null ? (
            <PlaceDetailCard />
          ) : (
            <BottomSheet
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