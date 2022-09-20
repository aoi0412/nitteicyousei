import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { addWeeks, subWeeks } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Header from "../src/components/Header";
import Calendar from "../src/components/schedule/Calendar";
import WideButton from "../src/components/WideButton";
import { getScheduleData } from "../src/database/functions/getData";
import {
  candidatesAtom,
  scheduleNameAtom,
  timeAtom,
} from "../src/database/recoil";
import { color } from "../src/styles/colors";

const SchedulePage = () => {
  const router = useRouter();
  const { scheduleID } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const setCandidates = useSetRecoilState(candidatesAtom);
  const [name, setName] = useRecoilState(scheduleNameAtom);
  const setTime = useSetRecoilState(timeAtom);
  const [pageDate, setPageDate] = useState(new Date());

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
    <Box height={window.innerHeight}>
      <Header />
      <Box maxW="970px" marginX="auto">
        <Text margin="4" fontSize="32px" fontWeight="bold" textAlign="center">
          {name}
        </Text>
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
          position="fixed"
          bottom="0"
          width="100%"
          bg="white"
          paddingY="8"
          zIndex="99"
        >
          <WideButton
            onClick={() => router.push(`/joinInSchedule/${scheduleID}`)}
          >
            自分の予定を入力する
          </WideButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
