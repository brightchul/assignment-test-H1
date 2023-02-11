import { SetStateFunction } from '@/types';

import WeekDayButton from './WeekDayButton';

const DAY_TEXT_LIST = ['일', '월', '화', '수', '목', '금', '토'];

type SelectWeekDayProps = { repeatedDayList: boolean[]; setRepeatedDayList: SetStateFunction<boolean[]> };

export default function SelectWeekDay({ repeatedDayList, setRepeatedDayList }: SelectWeekDayProps) {
  return (
    <div
      className="flex flex-wrap justify-around rounded-2xl  border-2  border-solid border-black p-2.5
        ">
      {DAY_TEXT_LIST.map((text, idx) => (
        <WeekDayButton
          idx={idx}
          key={`day-${idx}`}
          isSelected={repeatedDayList[idx]}
          setterFunction={setRepeatedDayList}>
          {text}
        </WeekDayButton>
      ))}
    </div>
  );
}
