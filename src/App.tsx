import { ThemeProvider } from '@/contexts';
import { BottomSheetProvider } from '@/contexts/BottomSheetContext';
import { Route, Routes } from 'react-router';
import MainPage from './page/MainPage';

const App = () => {
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
