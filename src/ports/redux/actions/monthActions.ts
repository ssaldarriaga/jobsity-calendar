import { MonthTypes } from '../types/monthTypes';
import { LoadMonthDataType } from './monthActions.types';

// Domain
import { getMonthData } from '../../../domain/services/monthService';

export const loadMonthData: LoadMonthDataType = (month, year, day) => {
  return (dispatch, getState) => {
    const state = getState().month;
    const payload = getMonthData(month, year, day, state);

    dispatch({
      type: MonthTypes.LOAD_DAYS_DATA,
      payload,
    });
  };
};
