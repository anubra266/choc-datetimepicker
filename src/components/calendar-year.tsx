import { Calendar } from "dayzed";
import { format } from "date-fns";
import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

export type CalendarYearProps = TextProps & {
  calendar: Calendar;
  format?: "short" | "long";
};

export function CalendarYear(props: CalendarYearProps) {
  const { format: dateFormat = "long", calendar, ...restProps } = props;

  const date = new Date();
  date.setFullYear(calendar.year);

  const yearFormat = { short: "yy", long: "yyyy" };

  const year = format(date, yearFormat[dateFormat]);

  return <Text {...restProps}>{year}</Text>;
}
