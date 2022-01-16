import { IconButton } from "@chakra-ui/button";
import React from "react";
import { ARROW_BUTTON_OFFSET } from "..";
import { useDateTimePickerContext } from "../context";
import { getDefaultArrowProps } from "../utils/arrowButtons";
import {
  ArrowButton as ArrowButtonType,
  ArrowDirection,
  ArrowProps,
} from "../utils/types";

export type ArrowButtonProps = ArrowProps & {
  direction: ArrowDirection;
};

export const ArrowButton = (props: ArrowButtonProps) => {
  const { as: As, direction, ...restProps } = props;

  const buttonProps = useMonthArrowButton(direction, restProps);

  const defaultArrowProps = getDefaultArrowProps(props);

  const defaultButton = <IconButton {...defaultArrowProps} {...buttonProps} />;
  const Button = As ? <As {...buttonProps} /> : defaultButton;

  return Button;
};

export const useMonthArrowButton = (
  direction: ArrowButtonProps["direction"],
  props: Record<string, any>
) => {
  const { dayzedProps } = useDateTimePickerContext();
  const { calendars, getBackProps, getForwardProps } = dayzedProps;
  const { arrowType = "month", ...restProps } = props;

  const directionProps = {
    previous: getBackProps,
    next: getForwardProps,
  };

  const buttonProps = directionProps[direction]({
    calendars,
    offset: ARROW_BUTTON_OFFSET[arrowType as ArrowButtonType],
    ...restProps,
  });
  return buttonProps;
};

export const BackButton = (props: ArrowProps) => {
  return <ArrowButton direction="previous" {...props} />;
};

export const NextButton = (props: ArrowProps) => {
  return <ArrowButton direction="next" {...props} />;
};
