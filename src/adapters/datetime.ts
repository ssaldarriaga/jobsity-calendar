import moment from 'moment';

export const parseCodeToMonthName = (code: string | number) => moment().month(code).format('MMMM');
