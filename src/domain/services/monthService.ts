import { GENERATED_DAYS } from '../data/monthData';
import { Month, MonthParamsType } from '../entities/monthEntities';
import { monthYearToID, isValidDate, parseDate, generateDays, parseCodeToMonthName } from '../../adapters/month';

export const validateDate = (month: string, year: string, day: string) => isValidDate(month, year, day);

export const getMonthNameFromParams = (params: MonthParamsType) => {
  const date = parseDate(params.month, params.year, params.day);
  return parseCodeToMonthName(date.month);
};

export const getMonthData = (month: string, year: string, day: string, monthState: Month): Month => {
  const date = parseDate(month, year, day);
  const newId = monthYearToID(date.month, date.year);
  if (newId === monthState.id || !validateDate(month, year, day)) return monthState;

  return {
    id: newId,
    days: generateDays(date.month, date.year, GENERATED_DAYS),
  };
};
