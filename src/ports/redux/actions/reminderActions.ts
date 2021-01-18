import { MonthTypes } from '../types/monthTypes';
import { ManageReminderType } from './reminderActions.types';

// Domain
import { manageReminderData } from '../../../domain/services/reminderService';

export const manageReminder: ManageReminderType = (reminder) => (dispatch, getState) => {
  const state = getState().month;
  const payload = manageReminderData(reminder, state);

  dispatch({
    type: MonthTypes.LOAD_DAYS_DATA,
    payload,
  });
};
