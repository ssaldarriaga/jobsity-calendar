import { ThunkAction } from 'redux-thunk';
import { ReducerType } from '../utils/redux';
import { MonthTypes } from '../types/monthTypes';
import { MonthAction } from '../../../domain/entities/monthEntities';

export type ActionType<T> = MonthAction<MonthTypes, T>;

export type LoadMonthDataType<T = undefined> = (
  month: string,
  year: string,
  day: string,
) => ThunkAction<void, ReducerType, unknown, ActionType<T>>;
