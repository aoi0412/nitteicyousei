import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../Header";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const CreateScheduleComp = () => {
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
    <Box
      height={window.innerHeight}
      display="flex"
      flexDir="column"
      width="100%"
      marginTop="-70px"
      paddingTop="60px"
    >
      <Header />
      <Box
        maxW="970px"
        marginX="auto"
        display="flex"
        flex="1"
        width="100%"
        flexDir="column"
        marginBottom="60px"
      >
        <Step1 />
        <Step2 />
        <Step3 />
      </Box>
    </Box>
  );
};

export default CreateScheduleComp;
