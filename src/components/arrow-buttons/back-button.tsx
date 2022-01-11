import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { MonthArrowProps } from "../../utils/types";
import { MonthArrowButton } from ".";

export const BackButton = (props: MonthArrowProps) => {
  return (
    <MonthArrowButton
      direction="back"
      aria-label="Previous month"
      icon={<FaChevronLeft />}
      {...props}
    />
  );
};
