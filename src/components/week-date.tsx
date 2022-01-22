import { Button, ButtonProps } from "@chakra-ui/react";
import { CSSObject } from "@chakra-ui/styled-system";
import { dataAttr } from "@chakra-ui/utils";
import { DateObj } from "dayzed";
import { isSameDay } from "date-fns";
import React from "react";

import { ARROW_KEYS } from "..";

import { useDateTimePickerContext } from "../context";
import {
  ArrowKeys,
  getDataValue,
  handleOutsideMonths,
} from "../utils/weekDates";

export type WeekDateProps = ButtonProps & {
  dateObj: "" | DateObj;
  _today?: CSSObject;
};

export const WeekDate = (props: WeekDateProps) => {
  const { dateObj, _today, ...restProps } = props;

  const {
    dayzedProps,
    dateTimePickerProps,
    setDate,
    date: calendarDate,
    getFirstDayInMonth,
    getWeekDateProps,
  } = useDateTimePickerContext();

  const { findNextDate, getDateButton } = getWeekDateProps();
  const { disabledDates, disableOutsideMonths } = dateTimePickerProps;
  const { getDateProps } = dayzedProps;

  if (!dateObj) return null;

  React.useEffect(() => {
    const dateValue = getDataValue(calendarDate);
    const dateButton = getDateButton(dateValue);
    if (dateButton) dateButton.focus();
    else {
      // Focus the first day whwenever we navigate the months
      const firstDay = getFirstDayInMonth();
      firstDay.focus();
    }
  }, [calendarDate]);

  let { date, selected, selectable, today, prevMonth, nextMonth } = dateObj;

  const isOutsideMonth = prevMonth || nextMonth;

  const disableAsOutsideMonths = isOutsideMonth && disableOutsideMonths;

  const isAmongDisabledDates = disabledDates?.some(d => isSameDay(d, date));
  const isDisabled =
    !selectable ||
    disableAsOutsideMonths ||
    isAmongDisabledDates ||
    props.isDisabled;

  const dataValue = getDataValue(date);

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = e => {
    if (ARROW_KEYS.includes(e.key)) {
      const nextFocusDate = findNextDate(date, e.key as ArrowKeys);

      //handle outside months
      if (["ArrowRight", "ArrowLeft"].includes(e.key) && !nextFocusDate) {
        const outsideMonthDate = handleOutsideMonths(date);
        if (outsideMonthDate) setDate(outsideMonthDate);
      }

      nextFocusDate?.focus();
      e.preventDefault();
    }
  };

  const dataProps = {
    "data-selected": dataAttr(selected),
    "data-today": dataAttr(today),
    "data-enabled": dataAttr(!isDisabled),
    "data-value": dataValue,
  };

  return (
    <Button
      {...getDateProps({ dateObj, disabled: isDisabled })}
      {...dataProps}
      {...defaultRootStyles}
      _disabled={defaultDisabledStyles}
      _selected={defaultSelectedStyles}
      __css={{
        "&[data-today]": _today || defaultTodayStyles,
      }}
      onKeyDown={onKeyDown}
      {...restProps}
    >
      {date.getDate()}
    </Button>
  );
};

const defaultDisabledStyles: ButtonProps = {
  color: "gray.300",
  cursor: "not-allowed",
  _dark: {
    color: "gray.600",
  },
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
