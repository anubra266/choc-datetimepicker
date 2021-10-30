import { DateTimePickerProps } from "./datetimepicker";
import {} from "@chakra-ui/react";

export type UseDateTimePickerProps = Partial<{
  defaultIsOpen: boolean;
}>;

export type UseDateTimePickerReturn = {
  dateTimePickerProps: DateTimePickerProps;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
