import React, { ReactNode, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { todoListState } from '@/stores/atoms';
import memoryLocalStorage from '@/stores/memoryLocalStorage';

type SyncLocalStorageProps = {
  children: ReactNode;
};

export default function SyncLocalStorage({ children }: SyncLocalStorageProps) {
  const setTodoList = useSetRecoilState(todoListState);

  useEffect(() => {
    memoryLocalStorage.setWindow();
    memoryLocalStorage.sync('todolist');
    if (memoryLocalStorage.hasItem('todolist')) {
      setTodoList(() => [...JSON.parse(memoryLocalStorage.getItem('todolist') as string)]);
    }
  }, [setTodoList]);

  return <>{children}</>;
}
