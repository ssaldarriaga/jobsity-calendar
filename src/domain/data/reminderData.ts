import moment from 'moment';

import { Reminder } from '../entities/reminderEntities';
import { THEME } from '../styles/theme';

export const REMINDER_MODEL_DATA: Reminder = {
  id: '',
  timestamp: +moment(),
  time: { date: moment().format('MM/DD/YYYY'), time: moment().format('HH:mm') },
  description: '',
  weatherForest: '',
  city: { idCity: '', city: '', idCountry: '', country: '' },
  color: THEME.dark.header,
};
