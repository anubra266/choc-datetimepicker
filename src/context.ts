import { createContext } from "@chakra-ui/react-utils";
import { UseDateTimePickerReturn } from "./utils/types";

export const [DateTimePickerProvider, useDateTimePickerContext] = createContext<
  UseDateTimePickerReturn
>({
  name: "DateTimePickerContext",
  errorMessage:
    "useDateTimePickerContext: `context` is undefined. Seems you forgot to wrap all date-time-picker components within `<DateTimePicker />`",
});
