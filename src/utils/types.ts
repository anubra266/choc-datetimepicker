import { IconButtonProps } from "@chakra-ui/button";

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ArrowProps = PartialBy<IconButtonProps, "aria-label"> & {
  arrowType?: ArrowButton;
};

export type ArrowButton = "month" | "year";

export type ArrowDirection = "previous" | "next";
