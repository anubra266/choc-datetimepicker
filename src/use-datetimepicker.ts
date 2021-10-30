import { useDisclosure } from "@chakra-ui/react";
import { DateTimePickerProps } from "./datetimepicker";
import { UseDateTimePickerReturn } from "./types";

/**
 * useDateTimepicker is a hook that provides all the state and focus management logic
 * for the component. It is consumed by the `DatePicker` component
 *
 */

export function useDateTimePicker(
  dateTimePickerProps: DateTimePickerProps
): UseDateTimePickerReturn {
  let { defaultIsOpen } = dateTimePickerProps;

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen });

  return { dateTimePickerProps, isOpen, onClose, onOpen };
}
