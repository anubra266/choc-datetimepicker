import {
  Input,
  InputProps,
  useMergeRefs,
  PopoverAnchor,
} from "@chakra-ui/react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { runIfFn } from "@chakra-ui/utils";
import React from "react";

import { useDateTimePickerContext } from "./context";
import { UseDateTimePickerReturn } from "./utils/types";

export type DateTimePickerTriggerProps = Omit<InputProps, "value"> & {
  children?: MaybeRenderProp<UseDateTimePickerReturn>;
};

export const DateTimePickerTrigger = (props: DateTimePickerTriggerProps) => {
  const context = useDateTimePickerContext();
  const { inputRef, getInputProps } = context;

  const ref = useMergeRefs(inputRef);
  const { children, ...restProps } = props;

  const inputProps = getInputProps(restProps);

  const customTrigger = runIfFn(children, context);

  const inputTrigger = <Input {...inputProps} ref={ref} />;
  const trigger = children ? customTrigger! : inputTrigger;

  return <PopoverAnchor>{trigger}</PopoverAnchor>;
};

DateTimePickerTrigger.displayName = "Input";

DateTimePickerTrigger.id = "Input";
