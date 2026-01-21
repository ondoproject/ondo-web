import {Coffee, type LucideIcon, MapPin, Utensils, Wine} from 'lucide-react';

interface CategoryStyle {
  icon: LucideIcon;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  glowClass: string;
}

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  '맛집': {
    icon: Utensils,
    color: 'pink',
    bgClass: 'bg-accent-pink/20',
    borderClass: 'border-accent-pink',
    textClass: 'text-accent-pink',
    glowClass: 'shadow-[0_0_20px_rgba(255,107,156,var(--glow-opacity))]',
  },
  '카페': {
    icon: Coffee,
    color: 'cyan',
    bgClass: 'bg-accent-cyan/20',
    borderClass: 'border-accent-cyan',
    textClass: 'text-accent-cyan',
    glowClass: 'shadow-[0_0_20px_rgba(0,212,255,var(--glow-opacity))]',
  },
  '술집': {
    icon: Wine,
    color: 'purple',
    bgClass: 'bg-accent-purple/20',
    borderClass: 'border-accent-purple',
    textClass: 'text-accent-purple',
    glowClass: 'shadow-[0_0_20px_rgba(167,139,250,var(--glow-opacity))]',
  }
};

const DEFAULT_STYLE: CategoryStyle = {
  icon: MapPin,
  color: 'pink',
  bgClass: 'bg-accent-pink/20',
  borderClass: 'border-accent-pink',
  textClass: 'text-accent-pink',
  glowClass: 'shadow-[0_0_20px_rgba(255,107,156,var(--glow-opacity))]',
};

export const getCategoryStyle = (category: string): CategoryStyle => {
  return CATEGORY_STYLES[category] ?? DEFAULT_STYLE;
};

export const getCategoryIcon = (category: string): LucideIcon => {
  return CATEGORY_STYLES[category]?.icon ?? MapPin;
};
