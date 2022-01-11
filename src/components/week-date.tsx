import { Button, ButtonProps } from "@chakra-ui/button";
import { CSSObject } from "@chakra-ui/styled-system";
import { dataAttr } from "@chakra-ui/utils";
import { DateObj } from "dayzed";
import React from "react";
import { useDateTimePickerContext } from "../context";

export type WeekDateProps = ButtonProps & {
  dateObj: "" | DateObj;
  _today?: CSSObject;
};

export const WeekDate = (props: WeekDateProps) => {
  const { dateObj, _today, ...restProps } = props;

  const { dayzedProps, dateTimePickerProps } = useDateTimePickerContext();
  const { disableOutsideMonths } = dateTimePickerProps;
  const { getDateProps } = dayzedProps;

  if (!dateObj) return null;

  let { date, selected, selectable, today, prevMonth, nextMonth } = dateObj;

  const isOutsideMonth = prevMonth || nextMonth;

  const disableAsOutsideMonths = isOutsideMonth && disableOutsideMonths;

  const isDisabled = !selectable || disableAsOutsideMonths;

  return (
    <Button
      {...getDateProps({ dateObj, disabled: isDisabled })}
      data-selected={dataAttr(selected)}
      data-today={dataAttr(today)}
      _disabled={defaultDisabledStyles}
      _selected={defaultSelectedStyles}
      __css={{
        "&[data-today]": _today || defaultTodayStyles,
      }}
      {...defaultRootStyles}
      {...restProps}
    >
      {date.getDate()}
    </Button>
  );
};

const defaultDisabledStyles: ButtonProps = {
  color: "gray.300",
  cursor: "not-allowed",
};

const defaultSelectedStyles: ButtonProps = {
  bg: "blue.400",
  color: "white",
  shadow: "lg",
};

const defaultTodayStyles: ButtonProps = {
  bg: "blue.50",
  color: "blue.500",
};

const defaultRootStyles: ButtonProps = {
  rounded: "full",
  boxSize: 8,
  justifySelf: "center",
  variant: "ghost",
};
