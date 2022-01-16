import { IconButtonProps } from "@chakra-ui/button";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import React from "react";

import { ArrowButtonProps } from "../components/arrow-buttons";
import { ArrowButton, ArrowDirection } from "./types";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const getDefaultArrowProps = ({
  direction,
  arrowType = "month",
}: ArrowButtonProps): IconButtonProps => {
  return {
    "aria-label": `${capitalizeFirstLetter(direction)} ${arrowType || "month"}`,
    variant: "ghost",
    size: "sm",
    icon: icons[direction][arrowType || "month"],
  };
};

type ArrowTypeIcon = Record<ArrowButton, JSX.Element>;

const icons: Record<ArrowDirection, ArrowTypeIcon> = {
  previous: { month: <FiChevronLeft />, year: <FiChevronsLeft /> },
  next: { month: <FiChevronRight />, year: <FiChevronsRight /> },
};
