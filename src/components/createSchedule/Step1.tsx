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
import { useRecoilState, useSetRecoilState } from "recoil";
import { scheduleNameAtom, timeAtom } from "../../database/recoil";
const Step1 = () => {
  const [time, setTime] = useRecoilState(timeAtom);
  const [scheduleName, setScheduleName] = useRecoilState(scheduleNameAtom);
  const handleChangeTime = (a: string, value: number) => setTime(value);
  const handleChangeName = (value: string) => setScheduleName(value);
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
            onChange={(e) => handleChangeName(e.target.value)}
            value={scheduleName}
          />
          <NumberInput
            focusBorderColor={color.dark}
            color={color.dark}
            value={time}
            size="md"
            maxW={24}
            step={30}
            onChange={handleChangeTime}
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
