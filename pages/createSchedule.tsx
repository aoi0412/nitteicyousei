import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Step1 from "../src/components/createSchedule/Step1";
import Step2 from "../src/components/createSchedule/Step2";
import Step3 from "../src/components/createSchedule/Step3";
import Header from "../src/components/Header";

const createSchedule = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading)
    return (
      <Box>
        <Text>loading...</Text>
      </Box>
    );
  return (
    <Box height={window.innerHeight}>
      <Header />
      <Box maxW="970px" marginX="auto">
        <Step1 />
        <Step2 />
        <Step3 />
      </Box>
    </Box>
  );
};

export default createSchedule;
