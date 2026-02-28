import { createContext, useContext, ReactNode } from 'react';
import { useLocations } from '@/hooks/useLocations';

type LocationContextType = ReturnType<typeof useLocations>;

const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const locations = useLocations();
  return (
    <LocationContext.Provider value={locations}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within LocationProvider');
  }
  return context;
};