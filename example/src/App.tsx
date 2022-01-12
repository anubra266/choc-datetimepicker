import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  useColorMode,
  Button,
  chakra,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
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
} from "../../";
import { sub } from "date-fns";

function App() {
  const [value, setValue] = useState<Date | undefined>();
  const { toggleColorMode } = useColorMode();
  const minDate = sub(new Date(), { days: 4 });

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <Button onClick={toggleColorMode}>Color Mode </Button>
      <FormControl id="email" w="60">
        <FormLabel>Choose Date</FormLabel>
        <DateTimePicker
          openOnFocus
          selected={value}
          onChange={setValue}
          disableOutsideMonths
          // minDate={minDate}
        >
          <DateTimePickerTrigger />
          {/* <DateTimePickerTrigger>
              <Button>wow</Button>
            </DateTimePickerTrigger> */}
          <DateTimePickerContent w="96">
            {({ calendars }) => (
              <>
                <div>
                  <BackButton />
                  <NextButton />
                  <BackButton as={Button}>Previous Month</BackButton>
                </div>
                <chakra.div display="flex">
                  {calendars.map((calendar, i) => (
                    <chakra.div
                      key={`${calendar.month}${calendar.year}/${i}`}
                      w="full"
                    >
                      <chakra.div
                        display="flex"
                        justifyContent="center"
                        gap="2"
                      >
                        <CalendarMonth calendar={calendar} format="long" />
                        <CalendarYear calendar={calendar} />
                      </chakra.div>
                      <WeekNames
                        color="red"
                        fontWeight="bold"
                        textTransform="uppercase"
                        format="short"
                      />
                      <chakra.div mb="4">
                        <WeekNames color="red">
                          {({ weekdays }) =>
                            weekdays.map((weekday, i) => (
                              <WeekDay
                                key={`${calendar.month}${calendar.year}${weekday}_=${i}`}
                              >
                                {weekday}
                              </WeekDay>
                            ))
                          }
                        </WeekNames>
                      </chakra.div>
                      <Stack spacing="4">
                        {calendar.weeks.map((week, weekIndex) => (
                          <SimpleGrid columns={7} spacingY="8" key={weekIndex}>
                            {week.map((dateObj, index) => {
                              return (
                                <WeekDate
                                  dateObj={dateObj}
                                  key={`${weekIndex}_+_${index}`}
                                />
                              );
                            })}
                          </SimpleGrid>
                        ))}
                      </Stack>
                    </chakra.div>
                  ))}
                </chakra.div>
              </>
            )}
          </DateTimePickerContent>
        </DateTimePicker>
        <FormHelperText>Choose your date</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
