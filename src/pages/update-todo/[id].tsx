import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Container from '@/components/Container';
import SelectWeekDay from '@/components/SelectWeekDay';
import { todoListState } from '@/stores/atoms';
import { selectTodoItemById } from '@/stores/selectors';
import { RepeatedDay } from '@/stores/types';

const repeatedDayInitList = [false, false, false, false, false, false, false];

export default function UpdateTodo() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const todoId = parseInt(id, 10);

  const todoItem = useRecoilValue(selectTodoItemById(todoId));
  const setTodoList = useSetRecoilState(todoListState);

  const [repeatedDayList, setRepeatedDayList] = useState(repeatedDayInitList);
  const setRepeatedDayListMemorize = useCallback(setRepeatedDayList, [setRepeatedDayList]);

  const updateTodo = ({ title, content }: { title: string; content: string | undefined }) => {
    const repeatedDay: RepeatedDay[] = repeatedDayList
      .map((isSelected, idx) => (isSelected ? idx : -1))
      .filter((one) => one > -1);

    setTodoList((preState) =>
      preState.map((one) =>
        one.id === todoId
          ? {
              ...one,
              ...{
                title,
                content,
                repeatedDay,
              },
            }
          : one,
      ),
    );

    router.push('/');
  };

  const { register, reset, handleSubmit, formState } = useForm({
    defaultValues: useMemo(() => todoItem ?? { title: '', content: '' }, [todoItem]),
  });

  useEffect(() => {
    if (todoItem) {
      reset({ title: todoItem?.title, content: todoItem?.content });
      setRepeatedDayList(repeatedDayList.map((_, idx) => todoItem.repeatedDay.includes(idx)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, setTodoList, todoItem]);

  return (
    <Container>
      <Link href="/">
        <h1 className="py-2 text-3xl font-bold">{'<'} ??? ??? ??????</h1>
      </Link>

      <form className="mt-5 flex h-full flex-col gap-2.5" onSubmit={handleSubmit(updateTodo)}>
        <div>
          <p className="text-xl font-bold">??????</p>
          <p>
            <input
              className="rounded-2xl border-2  border-solid  border-black py-1 px-2.5"
              {...register('title', { required: true })}></input>
          </p>
        </div>
        <div className="flex h-[40vh] flex-col">
          <p className="text-xl font-bold ">??????</p>
          <p className="flex-grow">
            <textarea
              {...register('content')}
              className="h-full w-full flex-grow resize-none rounded-2xl  border-2  border-solid border-black p-2.5"
            />
          </p>
        </div>
        <div>
          <p className="text-xl font-bold ">??????</p>
          <SelectWeekDay repeatedDayList={repeatedDayList} setRepeatedDayList={setRepeatedDayListMemorize} />
        </div>
        <div className="flex-grow"></div>
        <button
          disabled={!formState.isValid}
          type="submit"
          className="w-full rounded-lg bg-[#FAD957] p-2.5 text-xl font-bold disabled:bg-[#D5D5D5]">
          ??? ??? ??????
        </button>
      </form>
    </Container>
  );
}
