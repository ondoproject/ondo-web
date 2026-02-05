// 타입을 명확히 정의하여 자동완성과 에러 체크를 지원합니다.
interface CategoryStyle {
  color: string;
  borderClass: string;
  glowClass: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  dining: {
    color: '#A569BD',
    borderClass: 'border-[#A569BD]',
    glowClass: 'bg-[var(--accent-brown)]',
  },
  cafe: {
    color: '#F39C12',
    borderClass: 'border-[#F39C12]',
    glowClass: 'bg-[var(--accent-taupe)]',
  },
  bar: {
    color: '#3498DB',
    borderClass: 'border-[#3498DB]',
    glowClass: 'bg-[var(--accent-bage)]',
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