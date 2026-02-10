import { Category } from "@/types/category";
import { cn } from "@/utils";

interface SubCategoryPillsProps {
  subCategories: Category[];
  selectedCategory: String | null;
  onSelect: (category: string) => void;
}

const SubCategoryPills = ({ subCategories, selectedCategory, onSelect }: SubCategoryPillsProps) => {
  return (
    <div className="absolute flex top-2 left-0 right-0 z-[9999] gap-2 overflow-x-auto px-2.5 no-scrollbar">
        {subCategories.map((sub) => (
            <button
                key={sub.id}
                onClick={() => onSelect(sub.name)} 
                className={cn(
                    "w-[95.7px] h-[37.6px] shrink-0",
                    "p-2 rounded-full whitespace-nowrap text-sm transition-all",
                    "bg-[var(--bg-secondary)] backdrop-blur shadow-md border",
                    selectedCategory === sub.name 
                    ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-taupe)] shadow-[inset_0px_2px_3px_var(--shadow-color)]'
                    : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-accent-color)]'
                )}
            >
                {sub.name}
            </button>
        ))}
    </div>
  );
}

export default SubCategoryPills;