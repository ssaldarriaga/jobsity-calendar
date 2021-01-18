import { Reminder } from './reminderEntities';

export type Day = {
  id: string;
  title: string;
  isInCurrentMonth: boolean;
  dayOfWeek: number;
  reminders: { [key: string]: Reminder };
};
