import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { todoListState } from '@/stores/atoms';
import { RepeatedDay, Todo } from '@/stores/types';

const EMPTY_CONTENT_TEXT = '할 일 설명이 없어요.';
const ONLY_ONCE_TEXT = '한번만 보이는 할 일 이에요.';
const DAY_TEXT_LIST = ['일', '월', '화', '수', '목', '금', '토'];

function getRepeatedDayText(dayList: RepeatedDay[]) {
  if (!dayList || dayList.length === 0) {
    return ONLY_ONCE_TEXT;
  }
  return `${dayList.map((day) => DAY_TEXT_LIST[day]).join(', ')}요일 반복`;
}

export default function TodoListItem({ id, title, content, repeatedDay, isComplete, createdAt }: Todo) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const todoIndex = todoList.findIndex((todo) => todo.id === id);
  const router = useRouter();

  const toggleComplete = () => {
    const newList = todoList.slice();
    newList[todoIndex] = {
      id,
      title,
      content,
      repeatedDay,
      isComplete: !isComplete,
      createdAt,
    };
    setTodoList(newList);
  };

  const deleteTodoItem = () => {
    const newList = todoList.slice();
    newList.splice(todoIndex, 1);
    setTodoList(newList);
  };

  return (
    <div className="flex w-full gap-2.5 rounded-lg	bg-white p-2.5 ">
      <div>
        <input className="accent-yellow-300" type="checkbox" defaultChecked={isComplete} onClick={toggleComplete} />
      </div>
      <div className="grow cursor-pointer text-[#777777]" onClick={() => router.push(`/update-todo/${id}`)}>
        <div
          className="text-lg  font-bold text-black"
          style={{
            textDecoration: isComplete ? 'line-through' : 'auto',
          }}>
          {title}
        </div>
        <div
          style={{
            whiteSpace: 'pre-wrap',
          }}>
          {content ? content : EMPTY_CONTENT_TEXT}
        </div>
        <div>{getRepeatedDayText(repeatedDay)}</div>
      </div>
      <div>
        <button onClick={deleteTodoItem}>❌</button>
      </div>
    </div>
  );
}
