import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { selector, selectorFamily } from 'recoil';

import { todoListState } from './atoms';
import { Todo } from './types';

export const todayTodoListState = selector({
  key: 'todayTodoListState',
  get: ({ get }) => {
    dayjs.extend(isToday);
    const dayNumber = dayjs().day();
    const entireTodoList = get(todoListState);

    return entireTodoList.filter((todo) => {
      if (dayjs(todo.createdAt).isToday()) {
        return true;
      }
      return todo.repeatedDay.includes(dayNumber);
    });
  },
});

export const selectTodoItemById = selectorFamily({
  key: 'todoItemByIdState',
  get:
    (todoId: number) =>
    ({ get }) => {
      const entireTodoList: Todo[] = get(todoListState);
      return entireTodoList.find(({ id }) => id === todoId);
    },
});
