import {
  FormControl,
  FormHelperText,
  FormLabel,
  chakra,
  SimpleGrid,
  Stack,
  ButtonGroup,
  Button,
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
} from "choc-datetimepicker";

function App() {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <FormControl>
      <FormLabel>Choose Date</FormLabel>
      <DateTimePicker
        id="date"
        openOnFocus
        selected={value}
        onChange={setValue}
        disableOutsideMonths
      >
        <DateTimePickerTrigger />
        <DateTimePickerContent w="80" p="5" fontWeight="medium" rounded="xl">
          {({ dayzedProps: { calendars }, setToDate }) => (
            <chakra.div>
              <ButtonGroup size="sm" mb="3" w="full">
                <Button
                  onClick={() => {
                    setToDate(new Date());
                    setValue(new Date());
                  }}
                >
                  Today
                </Button>{" "}
                <Button
                  onClick={() => {
                    setToDate(add(new Date(), { days: 1 }));
                    setValue(add(new Date(), { days: 1 }));
                  }}
                >
                  Tomorrow
                </Button>{" "}
                <Button
                  onClick={() => {
                    setToDate(add(new Date(), { days: 2 }));
                    setValue(add(new Date(), { days: 2 }));
                  }}
                >
                  In 2 days
                </Button>
              </ButtonGroup>
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
                  <Stack spacing="2">
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
