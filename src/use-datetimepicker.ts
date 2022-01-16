import { useDimensions, useDisclosure } from "@chakra-ui/react";
import { runIfFn } from "@chakra-ui/utils";
import { useDayzed } from "dayzed";
import React, { useRef, useState } from "react";
import { format, getDaysInMonth, setDate as setDateFns } from "date-fns";

import { DateTimePickerProps } from "./datetimepicker";
import { UseDateTimePickerReturn } from "./types";
import { ArrowKeys, getDataValue } from "./utils/weekDates";
import { DATE_ARROW_METHODS, DATE_FORMAT } from ".";

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
    openOnFocus,
    selected,
    onChange,
    id: pickerId,
    ...restPickerProps
  } = dateTimePickerProps;

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen });

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date>(new Date());
  const [offset, setOffset] = useState<number | undefined>();

  const setToDate = (date: Date) => {
    setDate(date);
    setOffset(0);
  };

  const dateIsValid = (stringDate: string | Date) => {
    const yearConstruct = new Date(stringDate).getFullYear();
    return !isNaN(yearConstruct);
  };

  const updateDate = (newDate: Date | string) => {
    if (dateIsValid(newDate)) {
      runIfFn(onChange, new Date(newDate));
    }
  };

  React.useEffect(() => {
    const pickers = document.querySelectorAll(`[data-pickerid='${pickerId}']`);
    if (pickers.length > 1)
      console.error(
        `Found ${pickers.length} pickers with id \`${pickerId}\`; The id should be unique for each picker `
      );
  }, []);

  const dayzedProps = useDayzed({
    // firstDayOfWeek: 1,
    offset,
    onOffsetChanged: setOffset,
    showOutsideDays: true,
    date: date,
    selected,
    onDateSelected: _options => {
      updateDate(_options.date);
      // if (!options.selectable) {
      //   return;
      // }
      // props.onChange(options.date);
    },
    monthsToDisplay: 1,
    ...restPickerProps,
  });

  const [input, setInput] = useState("");
  React.useEffect(() => {
    const formattedValue = selected && format(selected, DATE_FORMAT);
    if (formattedValue) setInput(formattedValue!);
  }, [selected]);

  const getDateButton = (dataValue: string) => {
    return document.querySelector(
      `[data-value_${pickerId}='${dataValue}']`
    ) as HTMLElement;
  };

  const getInputProps: UseDateTimePickerReturn["getInputProps"] = props => {
    const { onBlur, onFocus, ...rest } = props;
    const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = e => {
      const inputValue = e.target.value;
      if (dateIsValid(inputValue)) {
        updateDate(inputValue);
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
          const dateValueData = getDataValue(selected || new Date());
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
          (dateButton?.dataset[`enabled_${pickerId}`] === "" ||
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
    };
  };

  return {
    dateTimePickerProps,
    dayzedProps,
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
