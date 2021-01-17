import { MonthTypes } from '../types/monthTypes';
import { LoadMonthDataType } from './monthActions.types';

// Domain
import { Month } from '../../../domain/entities/monthEntities';
import { getMonthData } from '../../../domain/services/monthService';

export const loadMonthData: LoadMonthDataType<Month> = (month, year, day) => {
  return async (dispatch, getState) => {
    const state = getState().month;
    const payload = getMonthData(month, year, day, state);

    dispatch({
      type: MonthTypes.LOAD_DAYS_DATA,
      payload,
    });
  };
};
