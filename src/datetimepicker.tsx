import React from "react";
import { Popover } from "@chakra-ui/react";
import { runIfFn } from "@chakra-ui/utils";

import { DateTimePickerProvider } from "./context";
import { useDateTimePicker } from "./use-datetimepicker";
import { UseDateTimePickerProps } from "./utils/types";

export type DateTimePickerProps = UseDateTimePickerProps;

//TODO show as modal on smaller screens

export const DateTimePicker = (props: DateTimePickerProps) => {
  const context = useDateTimePicker(props);
  const { isOpen, onClose, onOpen } = context;

  const children = runIfFn(props.children, context);
  const { placement = "bottom" } = props;

  return (
    <DateTimePickerProvider value={context}>
      <Popover
        isLazy
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        placement={placement}
        closeOnBlur={true}
      >
        {children}
      </Popover>
    </DateTimePickerProvider>
  );
};
