import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Container from '@/components/Container';
import SelectWeekDay from '@/components/SelectWeekDay';
import { todoListState } from '@/stores/atoms';
import { getTodoItemLastId } from '@/stores/selectors';
import { RepeatedDay } from '@/stores/types';

export default function AddTodo() {
  const router = useRouter();

  const setTodoList = useSetRecoilState(todoListState);

  const { register, handleSubmit, formState } = useForm({ defaultValues: { title: '', content: '' } });

  const [repeatedDayList, setRepeatedDayList] = useState<boolean[]>([false, false, false, false, false, false, false]);

  const setRepeatedDayListMemorize = useCallback(setRepeatedDayList, [setRepeatedDayList]);

  const newId = useRecoilValue(getTodoItemLastId) + 1;

  const addTodo = ({ title, content }: { title: string; content: string }) => {
    const repeatedDay: RepeatedDay[] = repeatedDayList
      .map((isSelected, idx) => (isSelected ? idx : -1))
      .filter((one) => one > -1);

    setTodoList((preState) => [
      ...preState,
      {
        title,
        content,
        createdAt: dayjs().toString(),
        repeatedDay,
        isComplete: false,
        id: newId,
      },
    ]);
    router.push('/');
  };

  return (
    <Container>
      <Link href="/">
        <h1 className="py-2 text-3xl font-bold">{'<'} 할 일 추가</h1>
      </Link>

      <form className="mt-5 flex h-full flex-col gap-2.5" onSubmit={handleSubmit(addTodo)}>
        <div>
          <p className="text-xl font-bold">제목</p>
          <p>
            <input
              className="rounded-2xl border-2  border-solid  border-black py-1 px-2.5"
              {...register('title', { required: true })}></input>
          </p>
        </div>
        <div className="flex h-[40vh] flex-col">
          <p className="text-xl font-bold ">설명</p>
          <p className="flex-grow">
            <textarea
              {...register('content')}
              className="h-full w-full flex-grow resize-none rounded-2xl  border-2  border-solid border-black p-2.5"
            />
          </p>
        </div>
        <div>
          <p className="text-xl font-bold ">반복</p>
          <SelectWeekDay repeatedDayList={repeatedDayList} setRepeatedDayList={setRepeatedDayListMemorize} />
        </div>
        <div className="flex-grow"></div>
        <button
          disabled={!formState.isValid}
          type="submit"
          className="w-full rounded-lg bg-[#FAD957] p-2.5 text-xl font-bold disabled:bg-[#D5D5D5]">
          할 일 추가
        </button>
      </form>
    </Container>
  );
}
