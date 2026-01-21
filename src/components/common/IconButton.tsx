import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const IconButton = ({ icon: Icon, onClick, label, className }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'w-11 h-11 rounded-xl',
        'border border-[var(--border-color)]',
        'bg-[var(--bg-card)] backdrop-blur-sm',
        'flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-105 hover:shadow-[0_0_15px_var(--shadow-color)]',
        className
      )}
    >
      <Icon className="w-5 h-5 text-[var(--text-primary)]" />
    </button>
  );
};
