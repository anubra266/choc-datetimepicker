import { IconButtonProps } from "@chakra-ui/button";

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type MonthArrowProps = PartialBy<IconButtonProps, "aria-label">;
