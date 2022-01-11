import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { runIfFn } from "@chakra-ui/utils";
import { SHORT_WEEKDAY_NAMES, SINGLE_WEEKDAY_NAMES, WEEKDAY_NAMES } from "..";
import React from "react";
import { WeekDay } from ".";
import { chakra, ChakraProps } from "@chakra-ui/system";

export type WeekNamesProps = ChakraProps & {
  children?: MaybeRenderProp<{
    weekdays:
      | typeof SHORT_WEEKDAY_NAMES[number][]
      | typeof SINGLE_WEEKDAY_NAMES[number][];
  }>;
  format?: "single" | "short";
};

export const WeekNames = (props: WeekNamesProps) => {
  const { children, format = "single", ...restProps } = props;

  const weekNames = children ? (
    runIfFn(children, { weekdays: WEEKDAY_NAMES[format] })
  ) : (
    <WeekDays {...restProps} />
  );

  return weekNames as JSX.Element;
};

const WeekDays = (
  props: ChakraProps & { format?: WeekNamesProps["format"] }
) => {
  const { format = "single", ...restProps } = props;
  return (
    <chakra.div {...restProps}>
      {WEEKDAY_NAMES[format].map((weekday, i) => (
        <WeekDay key={`${weekday}-${i}`}>{weekday}</WeekDay>
      ))}
    </chakra.div>
  );
};
