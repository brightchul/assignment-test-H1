import dayjs from 'dayjs';

const DAY_TEXT_LIST = ['일', '월', '화', '수', '목', '금', '토'];

export default function HomeTitle() {
  const now = dayjs();
  const date = now.date();
  const day = now.day();

  return (
    <div>
      <h1 className="py-2 text-3xl font-bold">News TO-DO !</h1>
      <p className="font-bold text-[#777777]">
        오늘은 {date}일 {DAY_TEXT_LIST[day]}요일 이에요.
      </p>
    </div>
  );
}
