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
  YearPicker,
} from "../../";
import { sub } from "date-fns";
import DonaApp from "./dona-app";

function App() {
  const [value, setValue] = useState<Date | Date[] | undefined>();
  const { toggleColorMode } = useColorMode();
  const disable = sub(new Date(), { days: 4 });
  const disable2 = sub(new Date(), { days: 2 });

  return (
    <Flex pt="28" justify="center" align="center" w="full" direction="column" gap={4}>
      <Button onClick={toggleColorMode}>Color Mode </Button>
      <DonaApp />
      <FormControl id="email" w="60">
        <FormLabel>Choose Date</FormLabel>
        <DateTimePicker
          openOnFocus
          selected={value}
          onChange={d => {
            console.log(d);
            setValue(d);
          }}
          disableOutsideMonths
          firstDayOfWeek={0}
          // disabledDates={[disable, disable2]}
          // minDate={minDate}
          isRange
        >
          {/* <YearPicker /> */}
          <DateTimePickerTrigger />
          {/* <DateTimePickerTrigger>
              <Button>wow</Button>
            </DateTimePickerTrigger> */}
          <DateTimePickerContent w="fit-content" p="5">
            {({ dayzedProps: { calendars }, setToDate }) => (
              <>
                <Button
                  onClick={() => {
                    setToDate(new Date());
                  }}
                >
                  Today
                </Button>
                <div>
                  <BackButton />
                  <NextButton />
                  <BackButton as={Button}>Previous Month</BackButton>
                  <BackButton arrowType="year" />
                  <NextButton arrowType="year" />
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
                      <Stack spacing="0">
                        {calendar.weeks.map((week, weekIndex) => (
                          <chakra.div display="flex" w="full" key={weekIndex}>
                            {week.map((dateObj, index) => {
                              return (
                                <WeekDate
                                  w="full"
                                  dateObj={dateObj}
                                  key={`${weekIndex}_+_${index}`}
                                />
                              );
                            })}
                          </chakra.div>
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
