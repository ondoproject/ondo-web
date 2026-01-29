import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { cn } from '@/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export const SearchModal = ({ isOpen, onClose, onSearch }: SearchModalProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={cn(
        'fixed inset-0 bg-black/50 z-[2000]',
        'flex items-center justify-center p-4',
        'transition-all duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <div
        className={cn(
          'w-full max-w-sm',
          'bg-[var(--bg-secondary)] backdrop-blur-md',
          'rounded-2xl px-4 py-6',
          'border border-[var(--border-color)]',
          'shadow-[0_20px_60px_rgba(0,0,0,0.3)]',
          'transition-all duration-300',
          isOpen ? 'scale-100' : 'scale-95'
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-2 w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border-color)] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          장소 검색
        </h3>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className={cn(
            'flex flex-row justify-between w-full',
          )}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="맛집, 카페, 바 검색..."
              autoFocus
              className={cn(
                'px-2 py-4',
                'rounded-xl',
                'bg-[var(--bg-card)]',
                'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                'outline-0 transition-all duration-300',
                'focus:shadow-[0_0_20px_var(--shadow-color)]'
              )}
            />
            <button
              type="submit"
              className={cn(
                'p-4 rounded-xl',
                'border border-[var(--accent-taupe)]',
                'text-black font-bold',
                'transition-all duration-300',
                'hover:shadow-[0_4px_20px_var(--shadow-color)]'
              )}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
