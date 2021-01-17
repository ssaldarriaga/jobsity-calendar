// Utils
import { createReducer } from '../utils/redux';
import { MonthTypes } from '../types/monthTypes';
import { Month, MonthAction } from '../../../domain/entities/monthEntities';

type MonthHandler = {
  [MonthTypes.LOAD_DAYS_DATA]: (state: Month, action: MonthAction<string, Month>) => Month;
};

const initialState = {
  id: '',
  days: {},
};

export const monthReducer = createReducer<Month, MonthHandler>(initialState, {
  [MonthTypes.LOAD_DAYS_DATA]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },
});
