import moment from 'moment';

import { Month } from '../entities/monthEntities';
import { GENERATED_DAYS } from '../data/monthData';

import { generateDay } from '../../adapters/day';
import { Reminder } from '../entities/reminderEntities';

const updateReminderInCatch = (reminder: Reminder) => {
  const date = moment(reminder.timestamp).format('y/M/D');
  const day = GENERATED_DAYS[date] ?? generateDay(moment(reminder.timestamp));
  day.reminders[reminder.id] = reminder;
  GENERATED_DAYS[date] = day;
};

export const manageReminderData = (reminder: Reminder, state: Month) => {
  if (!reminder.id) {
    reminder.id = Date.now().toString();
  }
  updateReminderInCatch(reminder);

  const date = moment(reminder.timestamp).format('y/M/D');
  if (date in state.days) {
    const day = state.days[date];
    state.days[date] = {
      ...day,
      reminders: { ...day.reminders, [reminder.id]: reminder },
    };
  }

  return state;
};

export const formatReminderMessage = ({ description, timestamp, city }: Reminder): { title: string; city: string } => ({
  title: `${moment(timestamp).format('HH:mm')} - ${description}`,
  city: `${city.city}, ${city.country}`,
});
