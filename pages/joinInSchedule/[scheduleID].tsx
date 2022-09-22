import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Fade,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { addWeeks, subWeeks } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Header from "../../src/components/Header";
import Calendar from "../../src/components/joinSchedule/Calendar";
import StepTitle from "../../src/components/StepTitle";
import WideButton from "../../src/components/WideButton";
import { updateCandidates } from "../../src/database/functions/createSchedule";
import { getScheduleData } from "../../src/database/functions/getData";
import {
  candidatesAtom,
  memberNameAtom,
  membersAtom,
  scheduleNameAtom,
  timeAtom,
} from "../../src/database/recoil";
import { color } from "../../src/styles/colors";

const ChangeSchedule = () => {
  const toast = useToast();
  const [name, setName] = useRecoilState(memberNameAtom);
  const [tmpName, setTmpName] = useState("");
  const router = useRouter();
  const { scheduleID } = router.query;
  const [pageDate, setPageDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const setScheduleName = useSetRecoilState(scheduleNameAtom);
  const setTime = useSetRecoilState(timeAtom);
  const [members, setMembers] = useRecoilState(membersAtom);
  useLayoutEffect(() => {
    if (scheduleID) {
      getScheduleData(scheduleID as string).then((data) => {
        const scheduleData = data.data();
        setCandidates(scheduleData?.candidates);
        setScheduleName(scheduleData?.scheduleName);
        setMembers(scheduleData?.members);
        setTime(scheduleData?.scheduleTime);
      });
      console.log(name);
      if (name) {
        setTmpName(name);
      }
      setLoading(false);
    }
  }, [scheduleID]);
  if (loading)
    return (
      <Box>
        <Text>loading...</Text>
      </Box>
    );
  const tmpNameInMembers = () => {
    return members.find((name) => name === tmpName);
  };
  const nameInMembers = () => {
    return members.find((member) => member === name);
  };
  return (
    <Box
      height={window.innerHeight}
      display="flex"
      flexDir="column"
      width="100%"
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
        <Box display="flex" flexDir="column">
          <StepTitle stepNum={1}>自分の名前を入力</StepTitle>
          <Box marginX="10%">
            <Input
              isDisabled={tmpNameInMembers() && nameInMembers()}
              focusBorderColor={color.dark}
              color={color.dark}
              variant="flushed"
              placeholder="自分の名前"
              _placeholder={{ color: color.dark }}
              onChange={(e) => setTmpName(e.target.value)}
              isInvalid={!(tmpNameInMembers() === nameInMembers())}
              onBlur={() => {
                console.log(members, tmpNameInMembers(), nameInMembers());
                if (tmpNameInMembers() && !nameInMembers()) {
                  toast({
                    title: "既に登録したメンバーです",
                    description:
                      "既存のメンバーの内容を変更したい場合はスケジュールページのメンバー一覧から行ってください",
                    status: "warning",
                    // size: "sm",
                  });
                } else if (!tmpNameInMembers() && nameInMembers()) {
                  console.log("ありえない！！", name, tmpName);
                  setName("");
                  setTmpName("");
                } else {
                  setName(tmpName);
                }
              }}
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
        </Box>
        <Box display="flex" flexGrow={1} overflowY="scroll" position="relative">
          <Box position="absolute" width="100%" top="0">
            <Calendar date={pageDate} />
          </Box>
        </Box>
        <Box
          zIndex={99}
          position="fixed"
          bottom="20px"
          width="full"
          margin="0"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          maxW="970px"
        >
          <Fade in={tmpName ? true : false} unmountOnExit>
            <WideButton
              onClick={() => {
                console.log(candidates);
                let tmp: string[] = [...members];
                if (!tmp.find((tmpdata) => tmpdata === tmpName)) {
                  tmp.push(tmpName);
                }
                updateCandidates(scheduleID as string, candidates, tmp);
                setName("");
                router.back();
              }}
            >
              決定
            </WideButton>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangeSchedule;
