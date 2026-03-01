import { cn } from "@/utils/cn";

interface ExploreMenuTabProps {
    label: string;
    imageUrl: string;
    isSelected: boolean;
    onSelect: () => void;
}

export const ExploreMenuTab = ({label, imageUrl, isSelected, onSelect}: ExploreMenuTabProps) => {

    return (
        <div
            className={cn(
            "shrink-0 rounded-xl transition-all duration-300 p-[6px]",
            isSelected
            ? "bg-gradient-to-tr from-[var(--border-color)] via-[#804804] to-[#514106] shadow-[var(--accent-orange)]"
            : "bg-transparent"
        )}>
            <div 
                className={cn(
                    "relative w-28 h-48 rounded-[10px] overflow-hidden",
                    "hover:scale-[1.03] transition-transform duration-300",
                    isSelected ? "ring-2 ring-white/30" : ""
                )}
                onClick={onSelect}
            >
                <img src={imageUrl} className="w-full h-full object-cover rounded-xl" />
                <p className="absolute bottom-2 right-2 text-white text-lg font-bold">{label}</p>
            </div>
        </div>
    );
};

export default ExploreMenuTab;