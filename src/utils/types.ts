import {
  InputProps,
  PopoverProps,
  PopoverContentProps,
  IconButtonProps,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { DateObj, Props, RenderProps } from "dayzed";
import { Dispatch, SetStateAction } from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";

import { DateTimePickerProps } from "../datetimepicker";
import { DateTimePickerTriggerProps } from "../datetimepicker-trigger";
import { ArrowKeys } from "./weekDates";
import { WeekDateProps } from "..";

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ArrowProps = PartialBy<IconButtonProps, "aria-label"> & {
  arrowType?: ArrowButtonType;
};

export type WeekDayFormat = "narrow" | "short" | "abbreviated" | "long";

export type ArrowButtonType = "month" | "year";

export type ArrowDirection = "previous" | "next";

export type ListReturnProps = PopoverContentProps & {};
export type WeekDateReturnProps = {
  findNextDate: (date: Date, direction: ArrowKeys) => HTMLElement | undefined;
  getDateButton: (dataValue: string) => HTMLElement;
  rangeDateProps: {
    getRangeStyles: (
      dateObj: DateObj,
      props: WeekDateProps
    ) => Record<string, any>;
    getHoverEvents: (
      date: Date
    ) => {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    isWithinHover: (date: Date) => boolean;
    isWithinSelect: (date: Date) => boolean;
  };
};

export type DayzedProps = Omit<Props, "children" | "render">;

export interface PartialPickerProps {
  closeOnBlur: boolean;
  defaultIsOpen: boolean;
  disabledDates: Date[];
  disableOutsideMonths: boolean;
  isDisabled: boolean;
  isRange: boolean;
  locale: Locale;
  openOnFocus: boolean;
  onStartDateChange: (startDate: Date | undefined) => void;
  onEndDateChange: (endtDate: Date | undefined) => void;
  placement: PopoverProps["placement"];
}
export interface UseDateTimePickerProps
  extends Partial<DayzedProps>,
    Partial<PartialPickerProps>,
    UseDisclosureProps {
  onChange: (selected: UseDateTimePickerProps["selected"]) => void;
  children: MaybeRenderProp<UseDateTimePickerReturn>;
}

export type UseDateTimePickerReturn = {
  dateTimePickerProps: DateTimePickerProps;
  dayzedProps: RenderProps;
  getFirstDayInMonth: () => HTMLElement;
  getInputProps: (props: DateTimePickerTriggerProps) => InputProps;
  getListProps: () => ListReturnProps;
  getWeekDateProps: () => WeekDateReturnProps;
  inputRef: React.RefObject<HTMLInputElement>;
  isOpen: boolean;
  listRef: React.RefObject<HTMLDivElement>;
  offset: number | undefined;
  onClose: () => void;
  onOpen: () => void;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  setOffset: Dispatch<SetStateAction<number | undefined>>;
  setToDate: (date: Date) => void;
};
