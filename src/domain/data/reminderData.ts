import moment from 'moment';

import { THEME } from '../styles/theme';
import { formatDayId } from '../../adapters/day';
import { Reminder } from '../entities/reminderEntities';

export const REMINDER_MODEL_DATA: Reminder = {
  id: '',
  day: formatDayId(),
  timestamp: +moment(),
  time: { date: moment().format('MM/DD/YYYY'), time: moment().format('HH:mm') },
  description: '',
  weatherForest: '',
  city: { city: '', country: '' },
  color: THEME.dark.header,
};
