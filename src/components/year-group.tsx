import { Button, ButtonProps } from "@chakra-ui/button";
import React from "react";
import { getYearGroupLabel } from "../utils/yearPicker";

export type YearGroupProps = ButtonProps & { group: number[] };

export function YearGroup(props: YearGroupProps) {
  const { group, ...restProps } = props;

  const groupLabel = getYearGroupLabel(group);

  return (
    <Button {...defaultStyles} {...restProps}>
      {groupLabel}{" "}
    </Button>
  );
}

const defaultStyles: ButtonProps = {
  size: "sm",
  fontSize: "xs",
};
