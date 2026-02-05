import { cn } from '@/utils';
import {Category} from "@/types/category.ts";

interface CategoryPillsProps {
  categories: Category[];
  selected: string;
  selectedMainCategoryId?: number | null;
  onSelect: (category: string) => void;
}

export const CategoryPills = ({ categories, selected, selectedMainCategoryId, onSelect }: CategoryPillsProps) => {
  const allCategories: Category[] = [
    { id: 0, name: 'ALL' },
    ...[...categories].reverse()
  ];

  return (
    <div className="w-full bg-[var(--bg-secondary)]">
      <div className={cn(
        "px-2.5 py-2 gap-2 border-2 border-[var(--bg-muted)]",
        "flex rounded-3xl", 
        "overflow-x-auto bg-[var(--bg-secondary)]",
        "items-center justify-around"
      )}>
        {allCategories.map((category) => {
          const isActive = 
            selected === category.name || 
            selectedMainCategoryId === category.id;

          return (
            <button
              key={category.name}
              onClick={() => onSelect(category.name)}
              className={cn(
                'flex-shrink-0 px-6 py-2 md:px-4 rounded-full',
                'text-sm font-medium',
                'flex flex-1 items-center justify-center gap-1.5 text-sm',
                'border transition-all duration-300',
                isActive
                  ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-taupe)] shadow-[inset_0px_2px_3px_var(--shadow-color)]'
                  : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-accent-color)] hover:-translate-y-0.5'
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
