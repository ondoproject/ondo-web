import { Home, Search } from 'lucide-react';
import { IconButton } from './IconButton';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  // const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const navigateExplore = () => {
    navigate('/explore', { state: { from: 'main' } });
  }

  const navigateHome = () => {
    navigate('/');
  }

  return (
    <header className="bg-[var(--bg-secondary)] backdrop-blur-md p-2 flex items-center justify-center border-b z-[1000]">
      <div className="flex items-center gap-2.5">
        <IconButton 
          icon={Home} 
          onClick={navigateHome} 
        />
      </div>

      <div className="flex flex-1 justify-center items-center mt-2">
        <img src="/logo.png" alt="온도 로고" className="h-full w-18 object-contain" />
      </div>
      
      <div className="flex items-center gap-2.5 ml-auto">
        <IconButton 
          icon={Search} 
          onClick={navigateExplore} 
          label="검색" 
        />
        {
        /* 다크 모드 비활성화
        <IconButton 
          icon={isDark ? Sun : Moon} 
          onClick={toggleTheme} 
          label="테마 변경" 
        />
        */}
      </div>
    </header>
  );
};
