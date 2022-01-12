import { useDimensions, useDisclosure } from "@chakra-ui/react";
import { runIfFn } from "@chakra-ui/utils";
import { useDayzed } from "dayzed";
import React, { useRef, useState } from "react";
import { format } from "date-fns";

import { DateTimePickerProps } from "./datetimepicker";
import { UseDateTimePickerReturn } from "./types";
import { getDataValue, getDateButton } from "./utils/weekDates";

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
    ...restPickerProps
  } = dateTimePickerProps;

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen });

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date>(new Date());

  const dateIsValid = (stringDate: string | Date) => {
    const yearConstruct = new Date(stringDate).getFullYear();
    return !isNaN(yearConstruct);
  };

  const updateDate = (newDate: Date | string) => {
    if (dateIsValid(newDate)) {
      runIfFn(onChange, new Date(newDate));
    }
  };

  const dayzedProps = useDayzed({
    // firstDayOfWeek: 1,
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
    const formattedValue = selected && format(selected, "dd/MM/yy");
    if (formattedValue) setInput(formattedValue!);
  }, [selected]);

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

  return {
    dateTimePickerProps,
    dayzedProps,
    getInputProps,
    getListProps,
    inputRef,
    isOpen,
    listRef,
    onClose,
    onOpen,
    date,
    setDate,
  };
}
