import { Flex, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import {} from "../../";

function App() {
  const [value, setValue] = useState("");

  return (
    <Flex pt="48" justify="center" align="center" w="full">
      <FormControl id="email" w="60">
        <FormLabel>Choose Date</FormLabel>
        <FormHelperText>Choose your date</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
