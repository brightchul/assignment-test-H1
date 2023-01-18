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

import jsonData from './api/data.json';

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

export async function getServerSideProps() {
  // NOTE:
  const newsData = await getNewsData({ page: 1, count: 10 });
  return { props: { newsData: newsData } };
}

type Data = {
  currentPage: number;
  items: { title: string; press: string; image: string; url: string; date: string }[];
};

// Note: 원래라면 외부 API 호출 부분이지만 해당 과제에서는 mock 데이터 사용으로 대체합니다.
export async function getNewsData({ page, count }: { page: number; count: number }): Promise<Data> {
  const from = (page - 1) * count;
  const to = from + count;
  return { currentPage: page, items: jsonData.slice(from, to) };
}
