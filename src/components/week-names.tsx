import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { runIfFn } from "@chakra-ui/utils";
import { SHORT_WEEKDAY_NAMES, SINGLE_WEEKDAY_NAMES, WEEKDAY_NAMES } from "..";
import React from "react";
import { WeekDay } from ".";
import { chakra, HTMLChakraProps } from "@chakra-ui/system";

import locale from "date-fns/esm/locale/en-US";

export type WeekNamesProps = HTMLChakraProps<any> & {
  children?: MaybeRenderProp<{
    weekdays:
      | typeof SHORT_WEEKDAY_NAMES[number][]
      | typeof SINGLE_WEEKDAY_NAMES[number][];
  }>;
  format?: "single" | "short";
};

export const WeekNames = (props: WeekNamesProps) => {
  const { children, format = "single", ...restProps } = props;
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    locale?.localize?.day(i, { width: "short" })
  );
  console.log("weekdays :>> ", weekdays);

  const customWeekNames = runIfFn(children, {
    weekdays: WEEKDAY_NAMES[format],
  });

  const defaultWeekNames = <WeekDays format={format} />;

  const weekNames = children ? customWeekNames : defaultWeekNames;

  return <chakra.div {...restProps}>{weekNames}</chakra.div>;
};

const WeekDays = (props: { format?: WeekNamesProps["format"] }) => {
  const { format = "single" } = props;

  return (
    <>
      {WEEKDAY_NAMES[format].map((weekday, i) => (
        <WeekDay key={`${weekday}-${i}`}>{weekday}</WeekDay>
      ))}
    </>
  );
};
