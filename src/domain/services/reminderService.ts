import moment from 'moment';

import { Day } from '../entities/dayEntities';
import { parseDate } from '../../adapters/month';
import { GENERATED_DAYS } from '../data/monthData';
import { Reminder } from '../entities/reminderEntities';
import { fetchWeather } from '../services/weatherService';
import { REMINDER_MODEL_DATA } from '../data/reminderData';
import { Month, MonthDays } from '../entities/monthEntities';
import { generateDay, formatDayId } from '../../adapters/day';

const updateReminderInCatch = (reminder: Reminder) => {
  const date = formatDayId(moment(reminder.timestamp));
  const day = GENERATED_DAYS[date] ?? generateDay(moment(reminder.timestamp));
  day.reminders[reminder.id] = reminder;
  GENERATED_DAYS[date] = day;
};

const deleteOldReminder = (data: MonthDays, oldDay: string, reminderId: string) => {
  if (oldDay in data) {
    delete data[oldDay].reminders[reminderId];
    data[oldDay].reminders = { ...data[oldDay].reminders };
  }
};

export const manageReminderData = async (reminder: Reminder, state: Month) => {
  if (!reminder.id) {
    reminder.id = Date.now().toString();
  }
  const weather = await fetchWeather(reminder.city.city, moment(reminder.timestamp).format('YYYY-MM-DD'));
  reminder.weatherForest = weather.text;

  const oldDay = reminder.day;
  reminder.day = formatDayId(moment(reminder.timestamp));

  updateReminderInCatch(reminder);
  if (oldDay !== reminder.day) {
    deleteOldReminder(GENERATED_DAYS, oldDay, reminder.id);
    deleteOldReminder(state.days, oldDay, reminder.id);
  }

  if (reminder.day in state.days) {
    const day = state.days[reminder.day];
    state.days[reminder.day] = {
      ...day,
      reminders: { ...day.reminders, [reminder.id]: reminder },
    };
  }

  return state;
};

export const formatReminderMessage = ({ description, timestamp }: Reminder): string =>
  `${moment(timestamp).format('HH:mm')} - ${description}`;

export const getNewReminderForDate = (day: Day): Reminder => {
  const [year, month, dayNumber] = day.id.split('/');
  const parsedDate = parseDate(month, year, dayNumber);
  const date = moment().year(parsedDate.year).month(parsedDate.month).date(parsedDate.day);

  return {
    ...REMINDER_MODEL_DATA,
    day: day.id,
    timestamp: +date,
    time: { date: date.format('MM/DD/YYYY'), time: date.format('HH:mm') },
  };
};

export const validateReminder = ({ description, city }: Reminder) => {
  const error: Record<string, string> = {};
  if (!description) error.description = 'Please type a valid description';
  if (description.length < 1 || description.length > 30)
    error.description = 'Description length must be between 1 and 30 characters';

  if (!city.city) error.city = 'Pleaty type a valid city';

  return error;
};
