import React from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { runIfFn } from "@chakra-ui/utils";

import { createYearGroups, getYearGroupLabel } from "../utils/yearPicker";
import { YearGroup } from ".";
import { SimpleGrid } from "@chakra-ui/layout";

export type YearPickerProps = {
  children?: MaybeRenderProp<{
    yearGroups: number[][];
  }>;
};

export function YearPicker(props: YearPickerProps) {
  const { children } = props;

  const yearGroups = createYearGroups(START_YEAR, END_YEAR, YEAR_GROUPS);

  const customYearPicker = runIfFn(children, {
    yearGroups,
  });

  const defaultYearPicker = <DefaultPicker yearGroups={yearGroups} />;

  const yearPicker = children ? customYearPicker : defaultYearPicker;

  return yearPicker as JSX.Element;
}

type DefaultPickerProps = { yearGroups: number[][] };

const DefaultPicker = (props: DefaultPickerProps) => {
  const { yearGroups } = props;

  return (
    <SimpleGrid columns={3} spacing="2">
      {yearGroups.map(group => (
        <YearGroup group={group} key={getYearGroupLabel(group)} />
      ))}
    </SimpleGrid>
  );
};

const START_YEAR = 1990;
const END_YEAR = 2109;
const YEAR_GROUPS = 12;
