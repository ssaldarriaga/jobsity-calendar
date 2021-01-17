import moment from 'moment';
import { DAYS_ON_WEEK } from '../domain/data/monthData';
import { MonthDays } from '../domain/entities/monthEntities';

export const parseDate = (month: string, year: string, day: string): { month: number; year: number; day: number } => ({
  month: parseInt(month) - 1,
  year: parseInt(year),
  day: parseInt(day),
});

export const parseCodeToMonthName = (code: number) => moment().month(code).format('MMMM');

export const monthYearToID = (month: number, year: number): string => `${month}-${year}`;

export const idToMonthYear = (id: string): string[] => id.split('-');

export const getDayOfWeekOfFirstDay = (month: number, year: number): number => {
  const dayOfWeek = moment().year(year).month(month).date(1).day();
  return dayOfWeek;
};

export const getDayOfWeekOfLastDay = (month: number, year: number): number => {
  const firstDayOfmonth = moment().year(year).month(month).date(1);
  const dayOfWeek = firstDayOfmonth.add(1, 'months').subtract(1, 'days').day();
  return dayOfWeek;
};

export const getDaysInMonth = (month: number, year: number): number => moment().year(year).month(month).daysInMonth();

export const isValidDate = (month: string, year: string, day: string) => {
  try {
    const date = parseDate(month, year, day);
    const yearIsValid = /^[0-9]{4}$/.test(date.year.toString());
    const monthIsValid = /^(0?[0-9]|1[01])$/.test(date.month.toString());

    if (!monthIsValid || !yearIsValid) return false;
    const daysInMonth = getDaysInMonth(date.month, date.year);
    const dayIsValid = date.day <= daysInMonth && date.day >= 1;

    if (!dayIsValid) return false;

    return moment().year(date.year).month(date.month).isValid();
  } catch (error) {
    return false;
  }
};

export const generateDays = (month: number, year: number, currentDays: MonthDays): MonthDays => {
  const daysToStartWeekFromFirstDay = getDayOfWeekOfFirstDay(month, year);
  const daysToFinishWeekFromLastDay = getDayOfWeekOfLastDay(month, year);
  const daysInMonth = getDaysInMonth(month, year);

  const initialDate = moment().year(year).month(month).date(1).subtract(daysToStartWeekFromFirstDay, 'days');
  const amountOfDays = daysInMonth + DAYS_ON_WEEK - daysToFinishWeekFromLastDay + daysToStartWeekFromFirstDay;
  const resp = Array(amountOfDays)
    .fill(0)
    .reduce((previous: MonthDays) => {
      const id = initialDate.format('y/M/D');
      const isInCurrentMonth = initialDate.month() === month;
      const title = isInCurrentMonth ? initialDate.format('D') : initialDate.format('MMM D');
      const day = {
        id,
        title,
        isInCurrentMonth,
        dayOfWeek: initialDate.day(),
        reminders: {},
      };

      if (id in currentDays) {
        initialDate.add(1, 'days');
        previous[id] = { ...currentDays[id], title, isInCurrentMonth };
        return previous;
      }

      previous[id] = day;
      currentDays[id] = day;
      initialDate.add(1, 'days');

      return previous;
    }, {});

  return resp;
};
