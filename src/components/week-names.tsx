import React from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { runIfFn } from "@chakra-ui/utils";
import { WeekDayFormat } from "..";
import { WeekDay } from ".";
import { chakra, HTMLChakraProps } from "@chakra-ui/system";
import { useWeekNames } from "../utils/weekNames";

export type WeekNamesProps = HTMLChakraProps<any> & {
  children?: MaybeRenderProp<{
    weekdays: string[];
  }>;
  format?: WeekDayFormat;
};

export const WeekNames = (props: WeekNamesProps) => {
  const { children, format, ...restProps } = props;

  const weekdays = useWeekNames(format);

  const customWeekNames = runIfFn(children, {
    weekdays,
  });

  const defaultWeekNames = <WeekDays format={format} />;

  const weekNames = children ? customWeekNames : defaultWeekNames;

  return <chakra.div {...restProps}>{weekNames}</chakra.div>;
};

const WeekDays = (props: { format?: WeekNamesProps["format"] }) => {
  const { format } = props;
  const weekdays = useWeekNames(format);

  return (
    <>
      {weekdays.map((weekday, i) => (
        <WeekDay key={`${weekday}-${i}`}>{weekday}</WeekDay>
      ))}
    </>
  );
};
