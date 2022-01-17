import {
  format,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  add,
  sub,
} from "date-fns";
import { DATE_ARROW_METHODS, DATE_FORMAT } from "..";

export type ArrowKeys = keyof typeof DATE_ARROW_METHODS;

export const getDataValue = (date: Date) => format(date, DATE_FORMAT);

export const getFirstDayInMonth = (pickerId: string) =>
  document.querySelector(`[data-enabled_${pickerId}]`) as HTMLElement;

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
