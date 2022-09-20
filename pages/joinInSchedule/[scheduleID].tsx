import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, IconButton, Input, Text } from "@chakra-ui/react";
import { addWeeks, subWeeks } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Header from "../../src/components/Header";
import Calendar from "../../src/components/joinSchedule/Calendar";
import StepTitle from "../../src/components/StepTitle";
import WideButton from "../../src/components/WideButton";
import { getScheduleData } from "../../src/database/functions/getData";
import {
  candidatesAtom,
  memberNameAtom,
  scheduleNameAtom,
  timeAtom,
} from "../../src/database/recoil";
import { color } from "../../src/styles/colors";

const ChangeSchedule = () => {
  const [name, setName] = useRecoilState(memberNameAtom);
  const [tmpName, setTmpName] = useState("");
  const router = useRouter();
  const { scheduleID } = router.query;
  const [pageDate, setPageDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const setCandidates = useSetRecoilState(candidatesAtom);
  const [scheduleName, setScheduleName] = useRecoilState(scheduleNameAtom);
  const setTime = useSetRecoilState(timeAtom);
  useLayoutEffect(() => {
    if (scheduleID) {
      getScheduleData(scheduleID as string).then((data) => {
        const scheduleData = data.data();
        setCandidates(scheduleData?.candidates);
        setName(scheduleData?.scheduleName);
        setTime(scheduleData?.scheduleTime);
      });
      setLoading(false);
    }
  }, [scheduleID]);
  if (loading)
    return (
      <Box>
        <Text>loading...</Text>
      </Box>
    );
  return (
    <Box height={window.innerHeight} width={window.innerWidth}>
      <Header />
      <Box maxW="970px" marginX="auto" position="relative">
        <StepTitle stepNum={1}>自分の名前を入力</StepTitle>
        <Box marginX="10%">
          <Input
            focusBorderColor={color.dark}
            color={color.dark}
            variant="flushed"
            placeholder="自分の名前"
            _placeholder={{ color: color.dark }}
            onChange={(e) => setTmpName(e.target.value)}
            onBlur={() => setName(tmpName)}
            value={tmpName}
            margin="4"
          />
        </Box>
        <StepTitle stepNum={2}>候補から参加できる日時を選択</StepTitle>
        <Flex paddingLeft="4" margin="2">
          <IconButton
            bg="white"
            _hover={{ bg: "rgba(0,0,0,0)" }}
            size="sm"
            aria-label="left-arrow"
            icon={<Icon as={ChevronLeftIcon} w="8" h="8" />}
            onClick={() => {
              setPageDate(subWeeks(pageDate, 1));
            }}
          />
          <IconButton
            bg="white"
            _hover={{ bg: "rgba(0,0,0,0)" }}
            size="sm"
            aria-label="left-arrow"
            icon={<Icon as={ChevronRightIcon} w="8" h="8" />}
            onClick={() => {
              setPageDate(addWeeks(pageDate, 1));
            }}
          />
          <Text fontSize="20" fontWeight="bold" color={color.dark}>
            {pageDate.getFullYear() + " " + pageDate.getMonth() + "月"}
          </Text>
        </Flex>
        <Calendar date={pageDate} />
        <Box
          zIndex={99}
          position="fixed"
          bottom="20px"
          width="full"
          margin="0"
          display="flex"
          alignItems="flex-end"
          maxW="970px"
        >
          <WideButton onClick={() => {}}>決定</WideButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangeSchedule;
