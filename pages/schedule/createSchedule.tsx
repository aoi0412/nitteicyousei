import {
  Box,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "../../src/components/createSchedule/Calendar";
import Header from "../../src/components/Header";
import StepTitle from "../../src/components/StepTitle";
import { color } from "../../src/styles/colors";
import Step1 from "../../src/components/createSchedule/Step1";
import Step2 from "../../src/components/createSchedule/Step2";

const createSchedule = () => {
  return (
    <Box>
      <Header />
      <Step1 />
      <Step2 />
    </Box>
  );
};

export default createSchedule;
