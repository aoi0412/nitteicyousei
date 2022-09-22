import {
  Box,
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FocusEvent, useState } from "react";
import { color } from "../../styles/colors";
import StepTitle from "../StepTitle";
import { useRecoilState, useSetRecoilState } from "recoil";
import { scheduleNameAtom, timeAtom } from "../../database/recoil";
const Step1 = () => {
  const setTime = useSetRecoilState(timeAtom);
  const [tmpTime, setTmpTime] = useState(60);
  const [scheduleName, setScheduleName] = useRecoilState(scheduleNameAtom);
  const handleChangeTime = () => {
    let tmp = tmpTime;
    tmp = tmp - (tmp % 30);
    if (tmp % 30 == 0) {
      setTmpTime(tmp);
      setTime(tmp);
    } else {
      setTmpTime(60);
      setTime(60);
    }
  };
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
            value={tmpTime}
            size="md"
            maxW={24}
            step={30}
            onChange={(a, b) => setTmpTime(b)}
            onBlurCapture={() => handleChangeTime()}
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
