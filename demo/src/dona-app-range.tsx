import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  chakra,
  SimpleGrid,
  Stack,
  ButtonGroup,
  Button,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { add } from "date-fns";
import {
  DateTimePicker,
  DateTimePickerContent,
  DateTimePickerTrigger,
  BackButton,
  NextButton,
  CalendarMonth,
  CalendarYear,
  WeekNames,
  WeekDay,
  WeekDate,
} from "../../dist";

function App() {
  const [value, setValue] = useState<Date | Date[] | undefined>();

  return (
    <>
      <FormControl w="fit-content">
        <FormLabel>Choose Date</FormLabel>
        <DateTimePicker
          openOnFocus
          selected={value}
          onChange={setValue}
          disableOutsideMonths
          isRange
          monthsToDisplay={2}
        >
          <DateTimePickerTrigger />
          <DateTimePickerContent
            w="fit-content"
            p="5"
            fontWeight="medium"
            rounded="xl"
          >
            {({ dayzedProps: { calendars }, setToDate }) => (
              <chakra.div display="flex" gap={4}>
                {calendars.map((calendar, i) => (
                  <chakra.div
                    key={`${calendar.month}${calendar.year}/${i}`}
                    w="full"
                  >
                    <chakra.div
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <chakra.div display="flex" gap="2">
                        <BackButton
                          arrowType="year"
                          variant="solid"
                          boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
                          _light={{ bg: "white" }}
                          rounded="lg"
                        />
                        <BackButton
                          variant="solid"
                          boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
                          _light={{ bg: "white" }}
                          rounded="lg"
                        />
                      </chakra.div>
                      <chakra.div display="flex" gap="2">
                        <CalendarMonth calendar={calendar} format="long" />
                        <CalendarYear calendar={calendar} />
                      </chakra.div>
                      <chakra.div display="flex" gap="2">
                        <NextButton
                          variant="solid"
                          boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
                          _light={{ bg: "white" }}
                          rounded="lg"
                        />
                        <NextButton
                          arrowType="year"
                          variant="solid"
                          boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
                          _light={{ bg: "white" }}
                          rounded="lg"
                        />
                      </chakra.div>
                    </chakra.div>
                    <chakra.div my="2">
                      <WeekNames color="rgb(181, 183, 186)" format="short">
                        {({ weekdays }) =>
                          weekdays.map((weekday, i) => (
                            <WeekDay
                              key={`${calendar.month}${calendar.year}${weekday}_=${i}`}
                            >
                              {weekday.substring(0, 2)}
                            </WeekDay>
                          ))
                        }
                      </WeekNames>
                    </chakra.div>
                    <Stack spacing="0">
                      {calendar.weeks.map((week, weekIndex) => (
                        <Flex columns={7} spacing="0" key={weekIndex}>
                          {week.map((dateObj, index) => {
                            return (
                              <WeekDate
                                fontWeight="medium"
                                dateObj={dateObj}
                                key={`${weekIndex}_+_${index}`}
                                rounded="lg"
                                p="2"
                                boxSize="10"
                                borderWidth={2}
                                fontSize="sm"
                                _today={{
                                  bg: "white",
                                  borderColor: "blue.100",
                                  color: "blue.400",
                                  light: {
                                    borderColor: "blue.400",
                                  },
                                }}
                                _rangeHovered={{
                                  bg: "blackAlpha.200",
                                  rounded: 0,
                                }}
                                _rangeSelected={{
                                  bg: "blackAlpha.100",
                                  _dark: {
                                    bg: "blackAlpha.400",
                                  },
                                  rounded: 0,
                                }}
                                _selected={{
                                  bg: "blackAlpha.400",
                                  _dark: { bg: "blackAlpha.600" },
                                }}
                                _disabled={{ color: "rgb(181, 183, 186)" }}
                              />
                            );
                          })}
                        </Flex>
                      ))}
                    </Stack>
                  </chakra.div>
                ))}
              </chakra.div>
            )}
          </DateTimePickerContent>
        </DateTimePicker>
        <FormHelperText>Choose your date</FormHelperText>
      </FormControl>
    </>
  );
}

export default App;
