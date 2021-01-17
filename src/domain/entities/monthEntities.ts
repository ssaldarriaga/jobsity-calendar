import { Day } from './dayEntities';

export type MonthParamsType = {
  year: string;
  month: string;
  day: string;
};

export type MonthAction<T, P = unknown> = {
  type: T;
  payload: P;
};

export type MonthDays = { [key: string]: Day };

export type Month = {
  id: string;
  days: MonthDays;
};
