import { Sparkles } from 'lucide-react';
import { cn, transformEngCategory } from '@/utils';
import { getCategoryIcon } from '@/constants';

interface CategoryPillsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryPills = ({ categories, selected, onSelect }: CategoryPillsProps) => {
  const allCategories = ['전체', ...categories];

  return (
    <div className="flex gap-2.5 px-5 py-3.5 overflow-x-auto bg-[var(--bg-secondary)] scrollbar-hide justify-center items-center">
      {allCategories.map((category) => {
        const isActive = selected === category;
        const Icon = category === 'All' ? Sparkles : getCategoryIcon(category);

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              'flex-shrink-0 px-4 py-2.5 rounded-full',
              'text-sm font-medium',
              'flex items-center gap-1.5',
              'border transition-all duration-300',
              isActive
                ? 'bg-gradient-to-r border-[var(--border-color)] text-black shadow-[0_0_20px_var(--shadow-color)]'
                : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-accent-color)] hover:-translate-y-0.5'
            )}
          >
            <Icon className="w-4 h-4" />
            {transformEngCategory(category)}
          </button>
        );
      })}
    </div>
  );
};
