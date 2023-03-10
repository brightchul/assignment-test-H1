import { atom } from 'recoil';

import memoryLocalStorage from './memoryLocalStorage';
import { Todo } from './types';
import { atomKey } from './util';

const initData: Todo[] = [];

// NOTE(@brightchul): Recoil을 next.js 사용시 hot module replacement로 인해 동일 키 생성되는 문제 우회
export const todoListState = atom<Todo[]>({
  key: atomKey('todoListState'),
  default: initData,
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = memoryLocalStorage.getItem('todolist');
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? memoryLocalStorage.removeItem('todolist')
          : memoryLocalStorage.setItem('todolist', JSON.stringify(newValue));
      });
    },
  ],
});
