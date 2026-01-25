import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { cn } from "@/utils/cn";
import { ChevronUp } from "lucide-react";

interface BottomSheetLayoutProps {
  children: React.ReactNode;
}

export const BottomSheetLayout = ({ children }: BottomSheetLayoutProps) => {
  const { isCollapsed, toggle, handlers } = useBottomSheet();

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 min-h-[320px]',
        'bg-[var(--bg-secondary)] backdrop-blur-lg',
        'rounded-t-3xl',
        'border-t border-[var(--border-color)]',
        'shadow-[0_-4px_30px_rgba(0,0,0,0.15)]',
        'z-[1000]',
        'transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isCollapsed && 'translate-y-[calc(100%-56px)]'
      )}
    >
        <div
            {...handlers}
            onClick={toggle}
            className="flex flex-col items-center py-3 px-5 cursor-grab active:cursor-grabbing"
        >
            <div
                className={cn(
                    'w-10 h-1 rounded-full mb-2',
                    'transition-all duration-300',
                    isCollapsed 
                    ? 'bg-[var(--text-muted)] shadow-[0_0_10px_var(--shadow-color)]' 
                    : 'bg-[var(--border-color)]'
                )}
            ></div>
            <div
                className={cn(
                    'flex items-center text-[12px] text-[var(--text-muted)]',
                    'transition-opacity duration-300',
                    isCollapsed ? 'opacity-100' : 'opacity-0'
                )}
            >
                <ChevronUp className="animate-bounce-up" size={12} />
                <p className="whitespace-nowrap">위로 스와이프</p>
            </div>
        </div>
        {children}
    </div>
  );
};

export default BottomSheetLayout;