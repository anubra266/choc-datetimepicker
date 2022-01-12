import { Stack, useColorMode, Button } from "@chakra-ui/react";
import SimpleDate from "./simple-date";

export default function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <Stack
      py="10"
      w="300px"
      direction="column"
      pos="absolute"
      left="50%"
      transform="translateX(-50%)"
    >
      <Button onClick={toggleColorMode}>Color Mode </Button>
      <SimpleDate />
    </Stack>
  );
}
