import { Calendar } from "dayzed";
import { format } from "date-fns";
import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

export type CalendarMonthProps = TextProps & {
  calendar: Calendar;
  format?: "short" | "long";
};

export function CalendarMonth(props: CalendarMonthProps) {
  const { format: dateFormat = "short", calendar, ...restProps } = props;

  const date = new Date();
  date.setMonth(calendar.month);

  const monthFormat = { short: "MMM", long: "MMMM" };

  const month = format(date, monthFormat[dateFormat]);

  return <Text {...restProps}>{month}</Text>;
}
