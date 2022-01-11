import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { MonthArrowProps } from "../../utils/types";
import { MonthArrowButton } from ".";

export const NextButton = (props: MonthArrowProps) => {
  return (
    <MonthArrowButton
      direction="next"
      aria-label="Next month"
      icon={<FaChevronRight />}
      {...props}
    />
  );
};
