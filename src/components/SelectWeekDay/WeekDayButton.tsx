import { SetStateFunction } from '@/types';
import { memo, ReactNode, useCallback } from 'react';

type WeekDayButtonProps = {
  idx: number;
  isSelected: boolean;
  setterFunction: SetStateFunction<boolean[]>;
  children: ReactNode;
};

function WeekDayButton({ idx, isSelected = false, children, setterFunction }: WeekDayButtonProps) {
  const handleClick = useCallback(() => {
    setterFunction((prev: boolean[]) => prev.map((v: boolean, index: number) => (index === idx ? !v : v)));
  }, [idx, setterFunction]);

  return (
    <button
      type="button"
      className="flex h-[10vw] max-h-[60px] w-[10vw] max-w-[60px] items-center justify-center rounded-full text-white"
      onClick={handleClick}
      style={{ backgroundColor: isSelected ? '#F2AE3C' : '#D8D8D8' }}>
      {children}
    </button>
  );
}

export default memo(WeekDayButton);
