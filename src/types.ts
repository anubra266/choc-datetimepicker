import {
  InputProps,
  PopoverProps,
  PopoverContentProps,
} from "@chakra-ui/react";
import { Props, RenderProps } from "dayzed";
import { Dispatch, SetStateAction } from "react";

import { DateTimePickerProps } from "./datetimepicker";
import { DateTimePickerTriggerProps } from "./datetimepicker-trigger";

export type ListReturnProps = PopoverContentProps & {};

export type DayzedProps = Omit<Props, "children" | "render">;

export type UseDateTimePickerProps = Partial<{
  closeOnBlur: boolean;
  defaultIsOpen: boolean;
  disabledDates: Date[];
  disableOutsideMonths: boolean;
  isDisabled: boolean;
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
  inputRef: React.RefObject<HTMLInputElement>;
  isOpen: boolean;
  listRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onOpen: () => void;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};
