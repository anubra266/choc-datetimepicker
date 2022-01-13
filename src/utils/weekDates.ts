import {
  format,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  add,
  sub,
} from "date-fns";
import { DATE_ARROW_METHODS } from "..";

export type ArrowKeys = keyof typeof DATE_ARROW_METHODS;

export const getDataValue = (date: Date) => format(date, "dd-MM-yyyy");

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
