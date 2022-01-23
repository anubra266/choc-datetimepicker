import {
  format,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  add,
  sub,
  isBefore,
  isAfter,
} from "date-fns";
import { DATE_ARROW_METHODS, DATE_FORMAT } from "..";

export type ArrowKeys = keyof typeof DATE_ARROW_METHODS;

export const getDataValue = (date: Date) => format(date, DATE_FORMAT);

export const handleOutsideMonths = (date: Date) => {
  //handle outside months
  if (isFirstDayOfMonth(date)) {
    const previousDate = sub(date, { days: 1 });
    return previousDate;
  }

  if (isLastDayOfMonth(date)) {
    const nextDate = add(date, { days: 1 });
    return nextDate;
  }
  return undefined;
};

export const compactDate = (dates: Date | Date[] | undefined) => {
  const dateArray = dates as Date[] | undefined;
  const startDate = dateArray && dateArray[0];
  const endtDate = dateArray && dateArray[1];
  return [startDate, endtDate] as const;
};

export const sortDatesAsc = <T extends number | Date | undefined>(
  dates: T[]
): T[] => {
  return dates.sort((a, b) =>
    isAfter(a!, b!) ? 1 : isBefore(a!, b!) ? -1 : 0
  );
};
