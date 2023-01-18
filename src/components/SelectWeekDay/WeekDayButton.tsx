import { ReactNode } from 'react';

type WeekDayButtonProps = {
  isSelected: boolean;
  children: ReactNode;
  handleToggle: () => void;
};

export default function WeekDayButton({ isSelected = false, children, handleToggle }: WeekDayButtonProps) {
  return (
    <button
      type="button"
      className="flex h-[10vw] max-h-[60px] w-[10vw] max-w-[60px] items-center justify-center rounded-full text-white"
      onClick={handleToggle}
      style={{
        backgroundColor: isSelected ? '#F2AE3C' : '#D8D8D8',
      }}>
      {children}
    </button>
  );
}
