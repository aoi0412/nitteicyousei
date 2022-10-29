import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { addWeeks, format, subWeeks } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Calendar from "../src/components/Calendar";
import Candidate from "../src/components/Calendar/TimeCellList/TimeCell/Candidate";
import Header from "../src/components/Header";
import WideButton from "../src/components/WideButton";
import { getScheduleData } from "../src/database/functions/getData";
import {
  candidatesAtom,
  memberNameAtom,
  membersAtom,
  scheduleNameAtom,
  timeAtom,
} from "../src/database/recoil";
import { useWindowResize } from "../src/function/windowSize";
import { color } from "../src/styles/colors";
import { candidate, candidates } from "../src/types/model";

const SchedulePage = () => {
  useWindowResize();
  const router = useRouter();
  const { scheduleID } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const [scheduleName, setScheduleName] = useRecoilState(scheduleNameAtom);
  const setTime = useSetRecoilState(timeAtom);
  const setName = useSetRecoilState(memberNameAtom);
  const [pageDate, setPageDate] = useState(new Date());
  const [members, setMembers] = useRecoilState(membersAtom);
  const showCanditateList = (a: candidates) => {
    let flatten = Object.values(a).flat();
    let tmp = flatten.map((times) => {
      return Object.values(times);
    });
    return tmp.flat();
  };
  useEffect(() => {
    console.log(candidates);
  }, []);
  useLayoutEffect(() => {
    if (scheduleID) {
      getScheduleData(scheduleID as string, (data) => {
        if (data) {
          const scheduleData = data;
          setCandidates(scheduleData?.candidates);
          setScheduleName(scheduleData?.scheduleName);
          setTime(scheduleData?.scheduleTime);
          setMembers(scheduleData?.members);

          const tmp: candidate[] = showCanditateList(
            scheduleData?.candidates
          ).sort(
            (a, b) =>
              new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
          );
          if (tmp.length) {
            const date = new Date(
              (tmp[0].startTime as unknown as Timestamp).seconds * 1000
            );
            setPageDate(date);
          }
        }
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
    <Box
      height={window.innerHeight}
      display="flex"
      flexDir="column"
      width="100%"
      margin="0"
      padding="0"
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
      >
        <Box display="flex" flexDir="column" flexGrow={1}>
          <Text margin="4" fontSize="32px" fontWeight="bold" textAlign="center">
            {scheduleName}
          </Text>
          <Tabs display="flex" flexDir="column" flex={1} isFitted>
            <TabList>
              {["カレンダー", "候補一覧", "メンバー一覧"].map((text) => (
                <Tab
                  key={text}
                  color="gray.200"
                  _selected={{ color: color.main, borderColor: color.main }}
                >
                  {text}
                </Tab>
              ))}
            </TabList>
            <TabPanels display="flex" flexGrow={1} flexDir="column">
              {/* カレンダー */}
              <TabPanel padding="0" display="flex" flexDir="column" flex={1}>
                <Calendar mode="view" />
              </TabPanel>
              {/* 候補一覧 */}
              <TabPanel display="flex" flexWrap="wrap">
                {showCanditateList(candidates)
                  .sort(
                    (a, b) =>
                      new Date(b.startTime).getTime() -
                      new Date(a.startTime).getTime()
                  )
                  .sort((a, b) => b.members.length - a.members.length)
                  .map((candidate) => (
                    <Box key={candidate.startTime.toString()}>
                      <Text>
                        {new Date(
                          (candidate.startTime as unknown as Timestamp)
                            .seconds * 1000
                        ).toString()}
                      </Text>
                    </Box>
                  ))}
              </TabPanel>
              {/* メンバー一覧 */}
              <TabPanel>
                {members.length ? (
                  members.map((member) => (
                    <Button
                      key={member}
                      onClick={() => {
                        setName(member);
                        router.push(`/joinInSchedule/${scheduleID}`);
                      }}
                    >
                      <Text>{member}</Text>
                    </Button>
                  ))
                ) : (
                  <Text>メンバーはまだいません</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          zIndex={99}
          width="full"
          margin="0"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          paddingY="8"
          maxW="970px"
        >
          <WideButton
            onClick={() => {
              router.push(`/joinInSchedule/${scheduleID}`);
            }}
          >
            予定を入力する
          </WideButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
