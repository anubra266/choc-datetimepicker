import defaultLocale from "date-fns/esm/locale/en-US";
import { WeekDayFormat } from "..";
import { useDateTimePickerContext } from "../context";

export const useWeekNames = (format?: WeekDayFormat) => {
  const { dateTimePickerProps } = useDateTimePickerContext();
  const DEFAULT_FORMAT = "narrow";

  const { locale = defaultLocale, firstDayOfWeek = 0 } = dateTimePickerProps;

  const weekdays = Array.from({ length: 7 }, (_, i) =>
    locale?.localize?.day(i, { width: format || DEFAULT_FORMAT })
  );

  const reArrangedWeekdays = weekdays.map(
    (_, i) => weekdays[(i + firstDayOfWeek) % 7]
  );

  return reArrangedWeekdays;
};
