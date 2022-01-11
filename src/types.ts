import { InputProps } from "@chakra-ui/react";
import { RenderProps } from "dayzed";
import { Dispatch, SetStateAction } from "react";

import { DateTimePickerProps } from "./datetimepicker";
import { DateTimePickerTriggerProps } from "./datetimepicker-trigger";

export type ListReturnProps = {};

export type UseDateTimePickerProps = Partial<{
  closeOnBlur: boolean;
  defaultIsOpen: boolean;
  isDisabled: boolean;
  openOnFocus: boolean;
  value: Date;
  onChange: (newDate: any) => void;

  minDate: Date;
}>;
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
