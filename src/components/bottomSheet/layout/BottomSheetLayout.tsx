import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { cn } from "@/utils/cn";

interface BottomSheetLayoutProps {
  children: React.ReactNode;
}

export const BottomSheetLayout = ({ children }: BottomSheetLayoutProps) => {
  const { isCollapsed, toggle, handlers } = useBottomSheet();

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 min-h-[320px] h-[40dvh]',
        'bg-[var(--bg-secondary)] backdrop-blur-lg',
        'rounded-t-3xl',
        'border-t border-[var(--border-color)]',
        'shadow-[0_-4px_8px_rgba(0,0,0,0.25)]',
        'z-[1000]',
        'transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]',
        isCollapsed 
        ? 'translate-y-[calc(100%-52px-env(safe-area-inset-bottom))]' 
        : 'translate-y-0',
        'pb-safe'
      )}
    >
        <div
            {...handlers}
            onClick={toggle}
            className="flex flex-col items-center pt-4 pb-2 cursor-grab active:cursor-grabbing"
        >
            <div
                className={cn(
                    'w-10 h-1 rounded-full bg-[var(--bg-muted)]',
                    'transition-all duration-300',
                    'shadow-[0_0_10px_var(--shadow-color)]' 
                )}
            ></div>
        </div>
        <div
            className={cn(
                'px-5 pb-2 flex flex-col',
                'transition-all duration-400',
                isCollapsed ? 'h-30 max-h-30' : 'opacity-100 max-h-[280px]'
            )}
        >
            {children}
        </div>
    </div>
  );
};

export default BottomSheetLayout;