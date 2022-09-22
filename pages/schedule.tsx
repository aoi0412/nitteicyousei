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
import { addWeeks, subWeeks } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Header from "../src/components/Header";
import Calendar from "../src/components/schedule/Calendar";
import Candidate from "../src/components/schedule/Candidate";
import WideButton from "../src/components/WideButton";
import { getScheduleData } from "../src/database/functions/getData";
import {
  candidatesAtom,
  memberNameAtom,
  membersAtom,
  scheduleNameAtom,
  timeAtom,
} from "../src/database/recoil";
import { color } from "../src/styles/colors";
import { candidate } from "../src/types/model";

const SchedulePage = () => {
  const router = useRouter();
  const { scheduleID } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const [scheduleName, setScheduleName] = useRecoilState(scheduleNameAtom);
  const setTime = useSetRecoilState(timeAtom);
  const setName = useSetRecoilState(memberNameAtom);
  const [pageDate, setPageDate] = useState(new Date());
  const [members, setMembers] = useRecoilState(membersAtom);
  const showCanditateList = () => {
    let flatten = Object.values(candidates).flat();
    let tmp = flatten.map((times) => {
      return Object.values(times);
    });
    console.log(tmp.flat());
    return tmp.flat();
  };
  useLayoutEffect(() => {
    if (scheduleID) {
      getScheduleData(scheduleID as string).then((data) => {
        const scheduleData = data.data();
        setCandidates(scheduleData?.candidates);
        setScheduleName(scheduleData?.scheduleName);
        setTime(scheduleData?.scheduleTime);
        setMembers(scheduleData?.members);
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
          {scheduleName}
        </Text>
        <Tabs isFitted justifyContent="center">
          <TabList>
            <Tab>カレンダー</Tab>
            <Tab>候補一覧</Tab>
            <Tab>メンバー一覧</Tab>
          </TabList>
          <TabPanels>
            {/* カレンダー */}
            <TabPanel>
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
            </TabPanel>
            {/* 候補一覧 */}
            <TabPanel>
              {showCanditateList().map((candidate) => (
                <Candidate
                  key={candidate.startTime.toString()}
                  position="relative"
                  candidate={candidate}
                  index={1}
                  height={40}
                  width={40}
                />
              ))}
            </TabPanel>
            {/* メンバー一覧 */}
            <TabPanel>
              {members.length ? (
                members.map((member) => (
                  <Button
                    key={member}
                    onClick={() => {
                      console.log("setted", member);
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
        position="fixed"
        bottom="0"
        width={window.innerWidth}
        margin="0"
        bg="white"
        paddingY="8"
        zIndex="99"
        display="flex"
        justifyContent="center"
      >
        <WideButton
          onClick={() => {
            router.push(`/joinInSchedule/${scheduleID}`);
          }}
        >
          自分の予定を入力する
        </WideButton>
      </Box>
    </Box>
  );
};

export default SchedulePage;
