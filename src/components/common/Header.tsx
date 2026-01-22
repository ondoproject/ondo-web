import { Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts';
import { IconButton } from './IconButton';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header = ({ onSearchClick }: HeaderProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-[var(--bg-secondary)] backdrop-blur-md p-2 flex items-center justify-between border-b border-[var(--border-color)] z-[1000]">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-pink via-accent-purple to-accent-cyan bg-clip-text text-transparent">
        Ondo
      </h1>
      
      <div className="flex items-center gap-2.5">
        <IconButton 
          icon={Search} 
          onClick={onSearchClick} 
          label="검색" 
        />
        <IconButton 
          icon={isDark ? Sun : Moon} 
          onClick={toggleTheme} 
          label="테마 변경" 
        />
      </div>
    </header>
  );
};
