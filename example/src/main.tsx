import React from "react";
import ReactDOM from "react-dom";
import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  ChakraTheme,
} from "@chakra-ui/react";

import "./index.css";
import App from "./App";

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819",
  },
  gray: {
    50: "#f8f7fa",
    700: "#282729",
    800: "#191819",
  },
};
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const styles: ChakraTheme["styles"] = {
  global: props => ({
    body: {
      bg: props.colorMode === "light" ? "gray.50" : "gray.800",
      transition: "background .4s ease-in-out",
    },
  }),
};

const theme = extendTheme({ colors, config, styles });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
