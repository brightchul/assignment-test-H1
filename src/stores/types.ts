export enum RepeatedDay {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface Todo {
  id: number;
  title: string;
  content: string | undefined;
  repeatedDay: RepeatedDay[];
  isComplete: boolean;
  createdAt: string;
}
