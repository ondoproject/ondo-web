/* 페이지 전체에서 전역으로 상태 동작 해야 하므로 컨텍스트로 이동 (향 후 폐기) */
import { useState, useCallback, useRef } from 'react';

interface UseBottomSheetReturn {
  isCollapsed: boolean;
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
  };
}

export const useBottomSheet = (): UseBottomSheetReturn => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const collapse = useCallback(() => setIsCollapsed(true), []);
  const expand = useCallback(() => setIsCollapsed(false), []);
  const toggle = useCallback(() => setIsCollapsed((prev) => !prev), []);

  const handleDragStart = (clientY: number) => {
    startY.current = clientY;
    isDragging.current = true;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging.current) return;
    const diff = clientY - startY.current;
    
    if (diff > 50) {
      collapse();
      isDragging.current = false;
    } else if (diff < -50) {
      expand();
      isDragging.current = false;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientY),
    onTouchEnd: handleDragEnd,
    onMouseDown: (e: React.MouseEvent) => {
      handleDragStart(e.clientY);
      
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientY);
      const handleMouseUp = () => {
        handleDragEnd();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
  };

  return {
    isCollapsed,
    collapse,
    expand,
    toggle,
    handlers,
  };
};
