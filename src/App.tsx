import { ThemeProvider } from '@/contexts';
import { BottomSheetProvider } from '@/contexts/BottomSheetContext';
import { Route, Routes } from 'react-router';
import MainPage from './page/MainPage';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const updateVh = () => {
      const viewportH = window.innerHeight;
      const vh = viewportH * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);

    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  return (
    <ThemeProvider>
      <BottomSheetProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BottomSheetProvider>
    </ThemeProvider>
  );
};

export default App;
