import moment from 'moment';

import { Day } from '../domain/entities/dayEntities';

export const formatDayId = (date: moment.Moment = moment()) => date.format('YYYY/MM/D');

export const generateDay = (date: moment.Moment): Day => ({
  id: formatDayId(date),
  title: date.format('D'),
  isInCurrentMonth: false,
  dayOfWeek: date.day(),
  reminders: {},
});
