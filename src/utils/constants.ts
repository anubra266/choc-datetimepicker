export const DATE_ARROW_METHODS = {
  ArrowUp: {
    func: (monthDaysArray: number[], currentDate: number) => {
      return monthDaysArray.filter(day => day < currentDate - 6).reverse();
    },
  },
  ArrowRight: {
    func: (monthDaysArray: number[], currentDate: number) => {
      return monthDaysArray.filter(day => day > currentDate);
    },
  },
  ArrowDown: {
    func: (monthDaysArray: number[], currentDate: number) => {
      return monthDaysArray.filter(day => day > currentDate + 6);
    },
  },
  ArrowLeft: {
    func: (monthDaysArray: number[], currentDate: number) => {
      return monthDaysArray.filter(day => day < currentDate).reverse();
    },
  },
};

export const ARROW_KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
export const DATE_FORMAT = "dd-MM-yyyy";

export const ARROW_BUTTON_OFFSET = {
  month: 1,
  year: 12,
};

export const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const SHORT_WEEKDAY_NAMES = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const SINGLE_WEEKDAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

export const WEEKDAY_NAMES = {
  single: SINGLE_WEEKDAY_NAMES,
  short: SHORT_WEEKDAY_NAMES,
};
