import dayjs from 'dayjs';
import Link from 'next/link';

import { NewsItem as NewsItemType } from './types';

type NewsItemProps = NewsItemType;

export default function NewsItem({ image, press, date, title, url }: NewsItemProps) {
  return (
    <div className="w-52 flex-none overflow-hidden rounded-xl bg-white" key={press + date + url}>
      <Link className="flex h-full flex-col" href={url} target="_blank" rel="noreferrer">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={title} src={image} className="h-32 w-full overflow-hidden object-cover" />
        </div>
        <div className="flex flex-grow flex-col justify-between p-3  ">
          <p className="pb-1 text-xs font-bold">{title}</p>
          <p className="text-xs font-bold" style={{ color: '#777777' }}>
            <span>
              {press} {dayjs(date).format('YYYY.MM.DD')}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
