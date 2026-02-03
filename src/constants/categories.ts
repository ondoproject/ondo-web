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
    color: 'var(--accent-bage)',
    bgClass: 'bg-[--accent-bage]',
    borderClass: 'border-[--accent-bage]',
    textClass: 'text-[--accent-bage]',
    glowClass: 'shadow-[0_0_20px_rgba(255,107,156,var(--glow-opacity))]',
  },
  '카페': {
    icon: Coffee,
    color: 'black',
    bgClass: 'bg-black',
    borderClass: 'border-black',
    textClass: 'text-black',
    glowClass: 'shadow-[0_0_20px_rgba(0,212,255,var(--glow-opacity))]',
  },
  '술집': {
    icon: Wine,
    color: 'var(--accent-taupe)',
    bgClass: 'bg-[--accent-taupe]',
    borderClass: 'border-[--accent-taupe]',
    textClass: 'text-[--accent-taupe]',
    glowClass: 'shadow-[0_0_20px_rgba(167,139,250,var(--glow-opacity))]',
  }
};

const DEFAULT_STYLE: CategoryStyle = {
  icon: MapPin,
  color: 'pink',
  bgClass: 'bg-[--accent-bage]',
  borderClass: 'border-[--accent-bage]',
  textClass: 'text-[--accent-bage]',
  glowClass: 'shadow-[0_0_20px_rgba(255,107,156,var(--glow-opacity))]',
};

export const getCategoryStyle = (category: string): CategoryStyle => {
  return CATEGORY_STYLES[category] ?? DEFAULT_STYLE;
};

export const getCategoryIcon = (category: string): LucideIcon => {
  return CATEGORY_STYLES[category]?.icon ?? MapPin;
};

export const CATEGORY_MAP: Record<number, number[]> = {
  4: [5, 7, 11, 12, 17 ,18, 19, 20],
  10: [1, 6, 9, 13, 16],
  14: [2, 3, 15],
};