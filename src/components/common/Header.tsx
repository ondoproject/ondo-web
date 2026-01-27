import { Search } from 'lucide-react';
import { IconButton } from './IconButton';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header = ({ onSearchClick }: HeaderProps) => {
  // const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-[var(--bg-secondary)] backdrop-blur-md p-2 flex items-center justify-center border-b z-[1000]">
      <h1 className="items-center justify-center flex flex-1 text-3xl text-[#86530c] ml-12">
        ONDO
      </h1>
      
      <div className="flex items-center gap-2.5 ml-auto">
        <IconButton 
          icon={Search} 
          onClick={onSearchClick} 
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
