import { Stack, useColorMode, Button } from "@chakra-ui/react";
import DonaApp from "./dona-app";
import DonaAppRange from "./dona-app-range";

export default function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <Stack
      py="10"
      w="300px"
      spacing="8"
      direction="column"
      pos="absolute"
      left="50%"
      transform="translateX(-50%)"
    >
      <Button onClick={toggleColorMode}>Color Mode </Button>
      <DonaApp />
      <DonaAppRange />
    </Stack>
  );
}
