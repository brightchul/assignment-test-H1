import NewsItem from './NewsItem';
import { NewsItem as NewsItemType } from './types';

export type NewsListProps = {
  newsList: NewsItemType[];
};

export default function NewsList({ newsList }: NewsListProps) {
  return (
    <div className="pt-10">
      <h3 className="pb-2 text-xl font-bold ">오늘의 뉴스</h3>
      <div className="flex gap-x-2.5 overflow-scroll">
        {newsList.map((news, idx) => (
          <NewsItem key={news.title + idx} {...news} />
        ))}
      </div>
    </div>
  );
}
