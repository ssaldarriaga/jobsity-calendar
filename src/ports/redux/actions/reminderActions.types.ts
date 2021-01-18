import { ThunkAction } from 'redux-thunk';
import { ReducerType } from '../utils/redux';
import { MonthTypes } from '../types/monthTypes';
import { Month } from '../../../domain/entities/monthEntities';
import { Reminder, ReminderAction } from '../../../domain/entities/reminderEntities';

export type ActionType<T> = ReminderAction<MonthTypes, T>;

export type ManageReminderType = (reminder: Reminder) => ThunkAction<void, ReducerType, unknown, ActionType<Month>>;
