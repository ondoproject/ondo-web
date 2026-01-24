import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface BottomSheetContextType {
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

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // 초기값: 닫힘
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const collapse = useCallback(() => setIsCollapsed(true), []);
  const expand = useCallback(() => setIsCollapsed(false), []);
  const toggle = useCallback(() => setIsCollapsed((prev) => !prev), []);

  const handleDragStart = (clientY: number) => {
    startY.current = clientY;
    currentY.current = clientY;
    isDragging.current = true;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging.current) return;
    currentY.current = clientY;
  };

  // 드래그가 끝났을 때 최종적으로 열릴지 닫힐지 판정
  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    
    const diff = currentY.current - startY.current;
    const threshold = 50; // 50px 이상 움직였을 때 판정

    if (diff > threshold) {
      collapse(); // 아래로 밀었으면 닫기
    } else if (diff < -threshold) {
      expand(); // 위로 밀었으면 열기
    }

    isDragging.current = false;
  }, [collapse, expand]);

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientY),
    onTouchEnd: handleDragEnd,
    onMouseDown: (e: React.MouseEvent) => {
      handleDragStart(e.clientY);
      
      const onMouseMove = (me: MouseEvent) => handleDragMove(me.clientY);
      const onMouseUp = () => {
        handleDragEnd();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };

  return (
    <BottomSheetContext.Provider value={{ isCollapsed, collapse, expand, toggle, handlers }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet는 BottomSheetProvider 내에서만 사용할 수 있습니다.');
  }
  return context;
};