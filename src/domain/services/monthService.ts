import { MonthParamsType } from '../entities/monthEntities';
import { parseCodeToMonthName } from '../../adapters/datetime';

export const getMonthNameFromParams = (params: MonthParamsType) => parseCodeToMonthName(params.month);
