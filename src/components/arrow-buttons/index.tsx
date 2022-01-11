import { IconButton, IconButtonProps } from "@chakra-ui/button";
import React from "react";
import { useDateTimePickerContext } from "../../context";
import { MonthArrowProps } from "../../utils/types";

export type MonthArrowButtonProps = MonthArrowProps & {
  direction: "back" | "next";
};

export const MonthArrowButton = (props: MonthArrowButtonProps) => {
  const { as: As, direction, ...restProps } = props;

  const buttonProps = useMonthArrowButton(direction, restProps);

  const defaultButton = <IconButton {...defaultArrowProps} {...buttonProps} />;
  const Button = As ? <As {...buttonProps} /> : defaultButton;

  return Button;
};

export const useMonthArrowButton = (
  direction: MonthArrowButtonProps["direction"],
  props: Record<string, any>
) => {
  const { dayzedProps } = useDateTimePickerContext();
  const { calendars, getBackProps, getForwardProps } = dayzedProps;

  const directionProps = {
    back: getBackProps,
    next: getForwardProps,
  };

  const buttonProps = directionProps[direction]({ calendars, ...props });
  return buttonProps;
};

const defaultArrowProps: IconButtonProps = {
  "aria-label": "",
  variant: "ghost",
  size: "sm",
};
