import React from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { Popover } from "@chakra-ui/react";
import { runIfFn } from "@chakra-ui/utils";

import { DateTimePickerProvider } from "./context";
import { useDateTimePicker } from "./use-datetimepicker";
import { UseDateTimePickerProps } from "./types";

export type DateTimePickerChildProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export interface DateTimePickerProps extends UseDateTimePickerProps {
  children: MaybeRenderProp<DateTimePickerChildProps>;
}

//TODO show as modal on smaller screens

export const DateTimePicker = (props: DateTimePickerProps) => {
  const context = useDateTimePicker(props);
  const { isOpen, onClose, onOpen } = context;

  const children = runIfFn(props.children, context);

  return (
    <DateTimePickerProvider value={context}>
      <Popover
        isLazy
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        autoFocus={false}
        placement="bottom"
        closeOnBlur={true}
      >
        {children}
      </Popover>
    </DateTimePickerProvider>
  );
};
