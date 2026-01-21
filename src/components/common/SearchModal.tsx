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
          'rounded-2xl p-6',
          'border border-[var(--border-color)]',
          'shadow-[0_20px_60px_rgba(0,0,0,0.3)]',
          'transition-all duration-300',
          isOpen ? 'scale-100' : 'scale-95'
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border-color)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          장소 검색
        </h3>

        <form onSubmit={handleSubmit} className="flex gap-2.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="맛집, 카페, 바 검색..."
            autoFocus
            className={cn(
              'flex-1 px-4 py-3.5',
              'rounded-xl border-[1.5px] border-[var(--border-color)]',
              'bg-[var(--bg-card)]',
              'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
              'outline-none transition-all duration-300',
              'focus:border-accent-pink focus:shadow-[0_0_20px_var(--shadow-color)]'
            )}
          />
          <button
            type="submit"
            className={cn(
              'px-5 py-3.5 rounded-xl',
              'bg-gradient-to-r from-accent-pink/30 to-accent-purple/30',
              'border border-accent-pink/50',
              'text-white font-semibold',
              'transition-all duration-300',
              'hover:shadow-[0_4px_20px_var(--shadow-color)]'
            )}
          >
            검색
          </button>
        </form>
      </div>
    </div>
  );
};
