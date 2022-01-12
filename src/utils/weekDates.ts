import {
  format,
  getDaysInMonth,
  setDate,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  add,
  sub,
} from "date-fns";
import { DATE_ARROW_METHODS } from "..";

export type ArrowKeys = keyof typeof DATE_ARROW_METHODS;

export const getDataValue = (date: Date) => format(date, "dd-MM-yyyy");
export const getDateButton = (dataValue: string) =>
  document.querySelector(`[data-value='${dataValue}']`) as HTMLElement;

export const findNextDate = (date: Date, direction: ArrowKeys) => {
  const { func } = DATE_ARROW_METHODS[direction];

  const daysInMonth = getDaysInMonth(date);
  //Add 1 day to account for 0 indexing
  const daysInMonthArray = Array.from(
    { length: daysInMonth },
    (_v, i) => i + 1
  );

  const nextDays = func(daysInMonthArray, date.getDate());
  const nextValidDateButton = nextDays.reduce((acc, day) => {
    const dateFromDay = setDate(date, day);
    const dataValue = getDataValue(dateFromDay);
    const dateButton = getDateButton(dataValue);
    if (
      (dateButton?.dataset.enabled === "" ||
        // Don't move focus when navigating up or down and the next date is disabled
        ["ArrowUp", "ArrowDown"].includes(direction)) &&
      !acc
    ) {
      acc = dateButton;
    }
    return acc;
  }, (undefined as unknown) as HTMLElement | undefined);
  return nextValidDateButton;
};

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
