import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Candidate from "../../src/components/createSchedule/Candidate";

import Header from "../../src/components/Header";
import Calendar from "../../src/components/schedule/Calendar";

import StepTitle from "../../src/components/StepTitle";
import WideButton from "../../src/components/WideButton";
import { getScheduleData } from "../../src/database/functions/getData";
import {
  candidatesAtom,
  scheduleNameAtom,
  timeAtom,
} from "../../src/database/recoil";
import { scheduleData } from "../../src/types/model";

const SchedulePage = () => {
  const router = useRouter();
  const { scheduleID } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const setCandidates = useSetRecoilState(candidatesAtom);
  const [name, setName] = useRecoilState(scheduleNameAtom);
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
    <Box height={window.innerHeight}>
      <Header />
      <Box maxW="970px" marginX="auto">
        <Text>{name}</Text>
        <Calendar date={new Date()} />
        <WideButton
          onClick={() => router.push(`/joinInSchedule/${scheduleID}`)}
        >
          自分の予定を入力する
        </WideButton>
      </Box>
    </Box>
  );
};

export default SchedulePage;
