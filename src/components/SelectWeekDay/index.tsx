import WeekDayButton from './WeekDayButton';

const DAY_TEXT_LIST = ['일', '월', '화', '수', '목', '금', '토'];
const repeatedDayListInit = [false, false, false, false, false, false, false];

type SelectWeekDayProps = { repeatedDayList: boolean[]; setRepoeatedDayList: (value: boolean[]) => void };

export default function SelectWeekDay({
  repeatedDayList = repeatedDayListInit,
  setRepoeatedDayList,
}: SelectWeekDayProps) {
  return (
    <div
      className="flex flex-wrap justify-around rounded-2xl  border-2  border-solid border-black p-2.5
        ">
      {DAY_TEXT_LIST.map((text, idx) => (
        <WeekDayButton
          key={`day-${idx}`}
          isSelected={repeatedDayList[idx]}
          handleToggle={() => {
            setRepoeatedDayList(
              repeatedDayList.map((prevValue, prevIdx) => (prevIdx === idx ? !prevValue : prevValue)),
            );
          }}>
          {text}
        </WeekDayButton>
      ))}
    </div>
  );
}
