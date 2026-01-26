import { useState, useMemo } from 'react';
import { ThemeProvider } from '@/contexts';
import { useLocations } from '@/hooks';
import { Header, CategoryPills, SearchModal, MapContainer, BottomSheet } from '@/components';
import type { Location } from '@/types';
import { BottomSheetProvider, useBottomSheet } from '@/contexts/BottomSheetContext';
import PlaceDetailCard from './components/bottomSheet/PlaceDetailCard';

const AppContent = () => {
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
    <div className="max-w-[430px] mx-auto min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
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

const App = () => {
  return (
    <ThemeProvider>
      <BottomSheetProvider>
        <AppContent />
      </BottomSheetProvider>
    </ThemeProvider>
  );
};

export default App;
