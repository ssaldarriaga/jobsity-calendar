import { ThunkAction } from 'redux-thunk';
import { ReducerType } from '../utils/redux';
import { MonthTypes } from '../types/monthTypes';
import { MonthAction, Month } from '../../../domain/entities/monthEntities';

export type ActionType<T> = MonthAction<MonthTypes, T>;

export type LoadMonthDataType = (
  month: string,
  year: string,
  day: string,
) => ThunkAction<void, ReducerType, unknown, ActionType<Month>>;
