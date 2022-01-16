import {
  InputProps,
  PopoverProps,
  PopoverContentProps,
  IconButtonProps,
} from "@chakra-ui/react";
import { Props, RenderProps } from "dayzed";
import { Dispatch, SetStateAction } from "react";

import { DateTimePickerProps } from "../datetimepicker";
import { DateTimePickerTriggerProps } from "../datetimepicker-trigger";
import { ArrowKeys } from "./weekDates";

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
};

export type DayzedProps = Omit<Props, "children" | "render">;

export type UseDateTimePickerProps = Partial<{
  closeOnBlur: boolean;
  defaultIsOpen: boolean;
  disabledDates: Date[];
  disableOutsideMonths: boolean;
  isDisabled: boolean;
  locale: Locale;
  openOnFocus: boolean;
  placement: PopoverProps["placement"];
  selected: Date;
  onChange: (newDate: any) => void;
}> &
  Partial<DayzedProps>;

export type UseDateTimePickerReturn = {
  dateTimePickerProps: DateTimePickerProps;
  dayzedProps: RenderProps;
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
