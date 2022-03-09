import { useDimensions, useDisclosure } from "@chakra-ui/react";
import { runIfFn, isArray } from "@chakra-ui/utils";
import { DateObj, useDayzed } from "dayzed";
import React, { useEffect, useRef, useState } from "react";
import {
  format,
  getDaysInMonth,
  setDate as setDateFns,
  isSameDay,
  isDate,
} from "date-fns";

import { DateTimePickerProps } from "../datetimepicker";
import {
  ArrowKeys,
  compactDate,
  getDataValue,
  sortDatesAsc,
} from "../utils/weekDates";
import { DATE_ARROW_METHODS, DATE_FORMAT } from "..";
import { UseDateTimePickerReturn } from "../utils/types";
import { useRangeDateProps } from "./use-range-date-props";

/**
 * useDateTimepicker is a hook that provides all the state and focus management logic
 * for the component. It is consumed by the `DatePicker` component
 *
 */

export function useDateTimePicker(
  dateTimePickerProps: DateTimePickerProps
): UseDateTimePickerReturn {
  let {
    closeOnBlur = true,
    defaultIsOpen,
    isDisabled,
    isOpen: isOpenProp,
    isRange,
    onChange,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onStartDateChange,
    onEndDateChange,
    openOnFocus,
    selected,
    ...restPickerProps
  } = dateTimePickerProps;

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isValidDate = (date?: Date | Date[]): date is Date => isDate(date);

  const getDefaultDate = () => {
    if (isValidDate(selected)) return selected;
    if (isArray(selected) && isValidDate(selected[0])) return selected[0];
    return new Date();
  };
  const defaultDate = getDefaultDate();
  const [date, setDate] = useState<Date>(defaultDate);

  const [offset, setOffset] = useState<number | undefined>();
  const [input, setInput] = useState("");

  const [startDate, endDate] = compactDate(selected);

  const setToDate = (date: Date) => {
    setDate(date);
    setOffset(0);
  };

  useEffect(() => {
    console.log(isValidDate(new Date()));
    // if (isValidDate(selected)) setToDate(selected);
  }, []);

  const dateIsValid = (stringDate: string | Date) => {
    const yearConstruct = new Date(stringDate).getFullYear();
    return !isNaN(yearConstruct);
  };

  const updateSingleDate = (newDate: Date | string) => {
    if (dateIsValid(newDate)) {
      runIfFn(onChange, new Date(newDate));
    }
  };

  const updateRangeDate = (dateObj: DateObj) => {
    // Set start date
    if (startDate && endDate) {
      runIfFn(onStartDateChange, dateObj.date);
      onChange([dateObj.date]);
      return;
    }

    // Set second date selected and correct ordering, as user may select dates
    // in reverse order
    if (startDate && !endDate && !isSameDay(dateObj.date, startDate)) {
      const [newStart, newEnd] = sortDatesAsc([startDate, dateObj.date]);

      runIfFn(onStartDateChange, newStart);
      runIfFn(onEndDateChange, newEnd);
      onChange([newStart, newEnd]);
      return;
    }

    // Otherwise, reset dates
    runIfFn(onStartDateChange, dateObj.date);
    runIfFn(onEndDateChange, undefined);
    onChange([dateObj.date]);
  };

  const onDateSelected = (dateObj: DateObj) => {
    if (!dateObj.selectable) {
      return;
    }

    if (isRange) {
      updateRangeDate(dateObj);
    } else {
      updateSingleDate(dateObj.date);
    }
  };

  const dayzedProps = useDayzed({
    date: date,
    monthsToDisplay: 1,
    offset,
    onDateSelected,
    onOffsetChanged: setOffset,
    selected,
    showOutsideDays: true,
    ...restPickerProps,
  });

  React.useEffect(() => {
    if (selected) {
      //TODO Watch here for other modes aside single picker
      //! Account for range Here
      const formattedValue = isRange
        ? null
        : format(selected as Date, DATE_FORMAT);
      if (formattedValue) setInput(formattedValue!);
    }
  }, [selected]);

  const getFirstDayInMonth = () =>
    listRef?.current?.querySelector(`[data-enabled]`) as HTMLElement;

  const getDateButton = (dataValue: string) => {
    return listRef?.current?.querySelector(
      `[data-value='${dataValue}']`
    ) as HTMLElement;
  };

  const rangeDateProps = useRangeDateProps(isRange, selected as Date[]);

  const getInputProps: UseDateTimePickerReturn["getInputProps"] = props => {
    const { onBlur, onFocus, ...rest } = props;
    const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
      const inputValue = e.target.value;
      if (dateIsValid(inputValue)) {
        // TODO
        /** We'll have two inputs when it's a range, and dynamically pass different props for those inputs, so input 1 should be updating start-date and 2: end-date */
        //! Account for range Here
        // updateDate(inputValue);
        setDate(new Date(inputValue));
      }
      setInput(inputValue);
    };

    return {
      onFocus: e => {
        runIfFn(onFocus, e);
        if (openOnFocus && !isDisabled) onOpen();
      },

      onBlur: e => {
        runIfFn(onBlur, e);
        const listIsFocused = e.relatedTarget === listRef?.current;
        const listContainsEvent = listRef.current?.contains(
          e.relatedTarget as any
        );
        if (!listIsFocused && !listContainsEvent && closeOnBlur) onClose();
      },
      value: input,
      onChange: onChangeInput,
      ...rest,
    };
  };

  const inputDimensions = useDimensions(inputRef, true);
  // const { getDateButton } = useDateButton();

  const getListProps: UseDateTimePickerReturn["getListProps"] = () => {
    const width = inputDimensions?.marginBox.width as number;

    return {
      width,
      onFocus: e => {
        const contentIsTarget = e.target === e.currentTarget;
        if (contentIsTarget) {
          //focus the selected date, if none then today's date
          const dateValueData = getDataValue(
            ((isRange ? startDate : selected) as Date) || new Date()
          );
          const dateToFocus = getDateButton(dateValueData);
          if (dateToFocus) dateToFocus.focus();
        }
      },
    };
  };

  const getWeekDateProps: UseDateTimePickerReturn["getWeekDateProps"] = () => {
    const findNextDate = (currentDate: Date, direction: ArrowKeys) => {
      const { func } = DATE_ARROW_METHODS[direction];
      const daysInMonth = getDaysInMonth(currentDate);
      //Add 1 day to account for 0 indexing
      const daysInMonthArray = Array.from(
        { length: daysInMonth },
        (_v, i) => i + 1
      );

      const nextDays = func(daysInMonthArray, currentDate.getDate());
      const nextValidDateButton = nextDays.reduce((acc, day) => {
        const dateFromDay = setDateFns(currentDate, day);
        const dataValue = getDataValue(dateFromDay);
        const dateButton = getDateButton(dataValue);
        if (
          (dateButton?.dataset[`enabled`] === "" ||
            // Don't move focus when navigating up or down and the next date is disabled
            ["ArrowUp", "ArrowDown"].includes(direction)) &&
          !acc
        ) {
          acc = dateButton;
        }
        return acc;
      }, (undefined as unknown) as HTMLElement | undefined);
      return nextValidDateButton;
    };

    return {
      findNextDate,
      getDateButton,
      rangeDateProps,
    };
  };

  return {
    dateTimePickerProps,
    dayzedProps,
    getFirstDayInMonth,
    getInputProps,
    getListProps,
    getWeekDateProps,
    inputRef,
    isOpen,
    listRef,
    offset,
    onClose,
    onOpen,
    date,
    setDate,
    setOffset,
    setToDate,
  };
}
