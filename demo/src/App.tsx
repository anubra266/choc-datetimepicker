
import { Stack } from "@chakra-ui/react";
import SimpleDate from "./simple-date";

export default function App() {
  return (
    <Stack
      w="300px"
      direction="column"
      pos="absolute"
      left="50%"
      transform="translateX(-50%)"
    >
      <SimpleDate />
    </Stack>
  );
}
