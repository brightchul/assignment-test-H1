import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { selector, selectorFamily } from 'recoil';

import { todoListState } from './atoms';
import { Todo } from './types';
import { atomKey } from './util';

export const todayTodoListState = selector({
  key: atomKey('todayTodoListState'),
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
  key: atomKey('todoItemByIdState'),
  get:
    (todoId: number) =>
    ({ get }) => {
      const entireTodoList: Todo[] = get(todoListState);
      return entireTodoList.find(({ id }) => id === todoId);
    },
});

export const getTodoItemLastId = selector({
  key: atomKey('getTodoItemLastId'),
  get: ({ get }) => {
    const entireTodoList = get(todoListState);
    return entireTodoList.reduce((newId, todoItem) => Math.max(newId, todoItem.id), 0);
  },
});
