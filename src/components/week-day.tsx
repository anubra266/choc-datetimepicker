import { Text, TextProps } from "@chakra-ui/layout";
import React from "react";

export const WeekDay = (props: TextProps) => {
  return (
    <Text
      display="inline-block"
      sx={{
        w: "calc(100% / 7)",
      }}
      {...props}
    />
  );
};
