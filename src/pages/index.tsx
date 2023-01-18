import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Container from '@/components/Container';
import HomeTitle from '@/components/HomeTitle';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/components/NewsList/types';
import TodoListView from '@/components/TodoListView';
import { todoListState } from '@/stores/atoms';
import memoryLocalStorage from '@/stores/memoryLocalStorage';

type HomeProps = {
  newsData: {
    currentPage: number;
    items: NewsItem[];
  };
};

export default function Home({ newsData }: HomeProps) {
  const setTodoList = useSetRecoilState(todoListState);

  useEffect(() => {
    memoryLocalStorage.setWindow();
    memoryLocalStorage.sync('todolist');
    const one = memoryLocalStorage.getItem('todolist');
    if (one) {
      setTodoList(() => [...JSON.parse(one)]);
    }
  }, [setTodoList]);

  return (
    <>
      <Head>
        <title>News TO-DO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <HomeTitle />
        <NewsList newsList={newsData.items} />
        <TodoListView />
      </Container>
    </>
  );
}

async function fetchNewsData({ page, count }: { page: number; count: number }) {
  return await fetch(`http://127.0.0.1:3000/api/news?page=${page}&count=${count}`).then((res) => res.json());
}

export async function getServerSideProps() {
  const newsData = await fetchNewsData({ page: 1, count: 10 });
  return { props: { newsData: newsData } };
}
