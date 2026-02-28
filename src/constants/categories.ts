// 타입을 명확히 정의하여 자동완성과 에러 체크를 지원합니다.
interface CategoryStyle {
  color: string;
  borderClass: string;
  glowClass: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  dining: {
    color: 'var(--accent-orange)',
    borderClass: 'border-[var(--accent-orange)]',
    glowClass: 'bg-[var(--accent-orange)]',
  },
  cafe: {
    color: 'var(--accent-taupe)',
    borderClass: 'border-[var(--accent-taupe)]',
    glowClass: 'bg-[var(--accent-taupe)]',
  },
  bar: {
    color: 'var(--accent-brown)',
    borderClass: 'border-[var(--accent-brown)]',
    glowClass: 'bg-[var(--accent-brown)]',
  },
};

const DEFAULT_STYLE: CategoryStyle = {
  color: '#000000',
  borderClass: 'border-gray-300',
  glowClass: 'bg-gray-300',
};

export const getCategoryStyle = (category: string): CategoryStyle => {
  return CATEGORY_STYLES[category.toLowerCase()] || DEFAULT_STYLE;
};

export const CATEGORY_MAP: Record<number, number[]> = {
  4: [5, 7, 11, 12, 17 ,18, 19, 20],
  10: [1, 6, 9, 13, 16, 19],
  14: [2, 3, 15],
};

export const MAIN_CATEGORIES_IMGS = [
  { id: 4, name: 'Dining', image: '/dining_location.png' },
  { id: 10, name: 'Cafe', image: '/cafe_location.png' },
  { id: 14, name: 'Bar', image: '/bar_location.png' },
];