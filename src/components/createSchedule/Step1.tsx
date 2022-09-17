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
import { color } from "../../styles/colors";
import StepTitle from "../StepTitle";
import { useSetRecoilState } from "recoil";
import { timeAtom } from "../../database/recoil";
const Step1 = () => {
  const [time, setTime] = useState(60);
  const setMeetingTime = useSetRecoilState(timeAtom);
  const handleChange = (a: string, value: number) => setTime(value);
  const handleBlur = () => setMeetingTime(time);
  return (
    <>
      <Box>
        <StepTitle stepNum={1}>会議内容を入力</StepTitle>
        <Flex marginX="10%" gap="4">
          <Input
            focusBorderColor={color.dark}
            color={color.dark}
            variant="flushed"
            placeholder="会議名"
            _placeholder={{ color: color.dark }}
          />
          <NumberInput
            focusBorderColor={color.dark}
            color={color.dark}
            value={time}
            size="md"
            maxW={24}
            step={30}
            onBlur={handleBlur}
            onChange={handleChange}
            min={30}
            max={300}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Box>
    </>
  );
};

export default Step1;
