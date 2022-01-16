import {
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  chakra,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
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
} from "choc-datetimepicker";
import { sub } from "date-fns";

function App() {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <FormControl id="email" w="60">
      <FormLabel>Choose Date</FormLabel>
      <DateTimePicker
        openOnFocus
        selected={value}
        onChange={setValue}
        disableOutsideMonths
      >
        <DateTimePickerTrigger />
        <DateTimePickerContent w="80" p="4" fontWeight="medium" rounded="xl">
          {({ dayzedProps: { calendars } }) => (
            <chakra.div display="flex">
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
                    <BackButton
                      variant="solid"
                      boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
                      bg="white"
                      rounded="lg"
                    />
                    <chakra.div display="flex" gap="2">
                      <CalendarMonth calendar={calendar} format="long" />
                      <CalendarYear calendar={calendar} />
                    </chakra.div>
                    <NextButton
                      variant="solid"
                      boxShadow="0 2px 2px 0 rgba(0, 0, 0, 0.2)"
                      bg="white"
                      rounded="lg"
                    />
                  </chakra.div>
                  <chakra.div my="3">
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
                  <Stack spacing="3">
                    {calendar.weeks.map((week, weekIndex) => (
                      <SimpleGrid columns={7} key={weekIndex}>
                        {week.map((dateObj, index) => {
                          return (
                            <WeekDate
                              fontWeight="medium"
                              dateObj={dateObj}
                              key={`${weekIndex}_+_${index}`}
                              rounded="lg"
                              _today={{
                                bg: "white",
                                border: "solid 2px",
                                borderColor: "blue.100",
                                color: "blue.400",
                              }}
                              _disabled={{ color: "rgb(181, 183, 186)" }}
                            />
                          );
                        })}
                      </SimpleGrid>
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
  );
}

export default App;
