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
  _rangeHovered?: CSSObject;
  _rangeSelected?: CSSObject;
};

export const WeekDate = (props: WeekDateProps) => {
  const {
    dateObj,
    _today,
    _rangeHovered,
    _rangeSelected,
    ...restProps
  } = props;

  const {
    dayzedProps,
    dateTimePickerProps,
    setDate,
    date: calendarDate,
    getFirstDayInMonth,
    getWeekDateProps,
  } = useDateTimePickerContext();

  const { disabledDates, disableOutsideMonths, selected } = dateTimePickerProps;
  const { getDateProps } = dayzedProps;
  const { findNextDate, getDateButton, rangeDateProps } = getWeekDateProps();
  const {
    getHoverEvents,
    getRangeStyles,
    isWithinHover,
    isWithinSelect,
  } = rangeDateProps;

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

  let {
    date,
    selected: isSelected,
    selectable,
    today,
    prevMonth,
    nextMonth,
  } = dateObj;

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

  const dataset = {
    "data-enabled": dataAttr(!isDisabled),
    "data-selected": dataAttr(isSelected),
    "data-today": dataAttr(today),
    "data-value": dataValue,
    "data-withinhover": dataAttr(selected && isWithinHover(dateObj.date)),
    "data-withinselect": dataAttr(selected && isWithinSelect(dateObj.date)),
  };

  const rangeHoverEvents = getHoverEvents(date);
  const rangeStyles = getRangeStyles(dateObj, props);

  return (
    <Button
      {...getDateProps({ dateObj, disabled: isDisabled })}
      {...dataset}
      _disabled={defaultDisabledStyles}
      _selected={defaultSelectedStyles}
      __css={{
        "&[data-today]": _today || defaultTodayStyles,
        ...rangeStyles,
        ...defaultRootStyles,
      }}
      onKeyDown={onKeyDown}
      {...rangeHoverEvents}
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
  borderWidth: 1,
  borderColor: "transparent",
};
