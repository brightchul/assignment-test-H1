import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { todayTodoListState } from '@/stores/selectors';
import TodoListItem from './TodoListItem';

export default function TodoListView() {
  const router = useRouter();
  const todoList = useRecoilValue(todayTodoListState);

  return (
    <>
      <div className="pb-2 pt-10  text-xl font-bold">오늘 할 일</div>
      <div className="grow overflow-auto">
        <div className="flex flex-col gap-2.5">
          {todoList.map((one, idx) => (
            <TodoListItem key={idx} {...one} />
          ))}
        </div>
      </div>
      <div>
        <button
          className="w-full rounded-lg bg-[#FAD957] p-2.5 text-xl font-bold"
          onClick={() => router.push('/add-todo')}>
          할 일 추가
        </button>
      </div>
    </>
  );
}
