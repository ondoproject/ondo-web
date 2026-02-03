import { Category } from "@/types/category";
import { cn } from "@/utils";

interface DetailCategoryPillsProps {
  subCategories: Category[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const DetailCategoryPills = ({ subCategories, selectedCategory, onSelect }: DetailCategoryPillsProps) => {
  return (
    <div className="absolute top-2 left-0 right-0 z-[9999] flex gap-2 overflow-x-auto px-4 no-scrollbar">
        {subCategories.map((sub) => (
            <button
                key={sub.id}
                onClick={() => onSelect(sub.name)} 
                className={cn(
                    "p-2 rounded-full whitespace-nowrap text-sm transition-all",
                    "bg-white/90 backdrop-blur shadow-md border",
                    selectedCategory === sub.name 
                    ? "border-[var(--brand-primary)] text-[var(--brand-primary)] font-bold" 
                    : "border-gray-200 text-gray-600"
                )}
                >
                {sub.name}
            </button>
        ))}
    </div>
  );
}