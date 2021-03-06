import {
  forwardRef,
  PopoverContent,
  PopoverContentProps,
  useMergeRefs,
} from "@chakra-ui/react";
import { runIfFn } from "@chakra-ui/utils";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import React from "react";
import { useDateTimePickerContext } from "./context";
import { UseDateTimePickerReturn } from ".";

export type DateTimePickerContentProps = PopoverContentProps & {
  children: MaybeRenderProp<UseDateTimePickerReturn>;
};

export const DateTimePickerContent = forwardRef<
  DateTimePickerContentProps,
  "div"
>((props, forwardedRef) => {
  const context = useDateTimePickerContext();
  const { listRef, getListProps } = context;
  const { children, ...restProps } = props;
  const ref = useMergeRefs(forwardedRef, listRef);
  const listProps = getListProps();

  const contentChildren = runIfFn(children, context);

  return (
    <PopoverContent ref={ref} {...baseStyles} {...listProps} {...restProps}>
      {contentChildren}
    </PopoverContent>
  );
});

DateTimePickerContent.displayName = "DateTimePickerContent";

const baseStyles: PopoverContentProps = {
  mt: "2",
  py: "4",
  bg: "gray.700",
  rounded: "md",

  border: "none",
  shadow: "base",
  zIndex: "popover",
  textAlign: "center",

  _light: {
    bg: "#ffffff",
  },
  _focus: {
    boxShadow: "none",
  },
};
