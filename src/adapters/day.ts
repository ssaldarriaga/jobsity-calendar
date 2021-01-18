import { Day } from '../domain/entities/dayEntities';

import moment from 'moment';

export const generateDay = (date: moment.Moment): Day => ({
  id: date.format('y/M/D'),
  title: date.format('D'),
  isInCurrentMonth: false,
  dayOfWeek: date.day(),
  reminders: {},
});
