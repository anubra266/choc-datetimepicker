import React from "react";
import { isEmpty } from "@chakra-ui/utils";
import { isSameDay, isBefore, isAfter } from "date-fns";
import { CSSObject } from "@chakra-ui/styled-system";

import { sortDatesAsc } from "../utils/weekDates";
import { DateObj } from "dayzed";
import { WeekDateProps } from "..";

export const useRangeDateProps = (
  isRange: boolean | undefined,
  selected: Date[]
) => {
  const [hoveredDate, setHoveredDate] = React.useState<Date | undefined>();

  const isWithinHover = (date: Date) => {
    const [startDate] = selected;
    // It's not within hovered if two dates have been selected
    if (selected.length === 2) {
      return false;
    }

    const [firstDate, secondDate] = sortDatesAsc([startDate, hoveredDate]);

    // Not in hovered range if one date hasn't been selected and not hovering on a second date
    if (!firstDate || !secondDate) {
      return false;
    }

    return (
      (isBefore(firstDate, date) || isSameDay(firstDate, date)) &&
      (isAfter(secondDate, date) || isSameDay(secondDate, date))
      //   firstDate.getTime() <= date.getTime() &&
      //   secondDate.getTime() >= date.getTime()
    );
  };

  const isWithinSelect = (date: Date) => {
    if (isEmpty(selected)) {
      return false;
    }
    const [startDate, endDate] = selected;

    if (isSameDay(startDate, date) || isSameDay(endDate, date)) {
      return true;
    }

    return (
      startDate?.getTime() <= date.getTime() &&
      endDate?.getTime() >= date.getTime()
    );
  };

  const getRangeHoverStyles = (_dateObj: DateObj) => {
    const hoverObj: any = {};

    return hoverObj;
  };

  const getRangeSelectStyles = (_dateObj: DateObj) => {
    const selectObj: any = {};

    return selectObj;
  };

  const getRangeStyles = (
    dateObj: DateObj,
    props: WeekDateProps
  ): CSSObject => {
    if (!isRange || !selected) return {};
    const { _rangeHovered, _rangeSelected } = props;

    const rangeHoverStyles = getRangeHoverStyles(dateObj);
    const rangeSelectStyles = getRangeSelectStyles(dateObj);

    return {
      "&[data-withinhover]": _rangeHovered || rangeHoverStyles,
      "&[data-withinselect]": _rangeSelected || rangeSelectStyles,
    };
  };

  const getHoverEvents = (date: Date) => ({
    onMouseEnter: () => setHoveredDate(date),
    onMouseLeave: () => setHoveredDate(undefined),
  });

  return {
    getRangeStyles,
    getHoverEvents,
    isWithinHover,
    isWithinSelect,
  };
};
