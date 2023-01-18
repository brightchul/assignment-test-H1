import type { NextApiRequest, NextApiResponse } from 'next';

import jsonData from './data.json';

type Item = {
  title: string;
  press: string;
  image: string;
  url: string;
  date: string;
};

type Data = {
  currentPage: number;
  items: Item[];
};

function parseStringToInt(value: undefined | string | string[], defaultValue: number) {
  const parsedValue = parseInt(`${value}`, 10);

  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { page, count } = req.query;

  const pageNum = parseStringToInt(page, 1);
  const countNum = parseStringToInt(count, 10);

  const from = (pageNum - 1) * countNum;
  const to = from + countNum;

  res.status(200).json({ currentPage: pageNum, items: jsonData.slice(from, to) });
}
