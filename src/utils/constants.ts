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
