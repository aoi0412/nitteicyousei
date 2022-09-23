import {
  Box,
  Button,
  Fade,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  deleteCandidate,
  formatDate,
  formatTime,
  getEachMinute,
  getJaWeekString,
  getWeekList,
  setCandidate,
} from "../../function/calendar";
import { color } from "../../styles/colors";
import Candidate from "./Candidate";
import { candidatesAtom, timeAtom } from "../../database/recoil";
import { useRecoilValue, useRecoilState } from "recoil";
type Props = {
  date: Date;
};
const Calendar: FC<Props> = ({ date }) => {
  const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
  const height = 30;
  const minuteList = getEachMinute();
  const weekList = getWeekList(date);
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const scheduleTime = useRecoilValue(timeAtom);
  return (
    <TableContainer width="full" padding="4" paddingTop="0">
      <Table display="flex" flexDir="column" position="relative">
        <Thead
          padding="0"
          position="fixed"
          width="full"
          maxW="970px"
          paddingRight="49px"
          bg="white"
          zIndex={99}
        >
          <Tr display="flex" padding="0">
            <Th
              borderRightWidth="thin"
              borderColor={color.dark}
              padding="0"
              height={height}
              width="42px"
            ></Th>
            {dayOfWeekList.map((dayOfWeek, index) => {
              return (
                <Th
                  height={`${height}px`}
                  display="flex"
                  flexGrow={1}
                  flexDirection="column"
                  alignItems="center"
                  borderBottomWidth="thin"
                  borderRightWidth="thin"
                  borderColor={color.dark}
                  padding="0"
                  margin="0"
                  key={dayOfWeek}
                >
                  <Text>{weekList[index].getDate()}</Text>
                  <Text>{dayOfWeek}</Text>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody marginTop="30px" padding="0">
          <Tr display="flex">
            <Td
              padding="0"
              paddingRight="2"
              borderRightWidth="thin"
              borderColor={color.dark}
            >
              <Box height={`${height - 12}px`}></Box>
              {minuteList.slice(1).map((data) => (
                <Text
                  height={`${height}px`}
                  verticalAlign="center"
                  fontSize="sm"
                  key={data.Hour + data.Minute}
                >
                  {formatTime(data)}
                </Text>
              ))}
            </Td>
            {weekList.map((date) => {
              return (
                <Td
                  key={date.toString()}
                  display="flex"
                  flexGrow={1}
                  flexDir="column"
                  borderRightWidth="thin"
                  borderColor={color.dark}
                  padding="0"
                  margin="0"
                  overflow="hidden"
                >
                  {minuteList.map((time, index2) => {
                    // const [isCandidateIn, setIsCendidateIn] = useState(false);
                    return (
                      <Box
                        key={time.Hour + time.Minute}
                        borderBottomStyle={index2 % 2 == 0 ? "dotted" : "solid"}
                        borderBottomWidth="thin"
                        borderColor={color.dark}
                        borderRadius="none"
                        height={`${height}px`}
                        padding="0"
                        position="relative"
                      >
                        <Fade
                          in={
                            formatDate(date) in candidates &&
                            formatTime(time) in candidates[formatDate(date)]
                          }
                          unmountOnExit
                        >
                          <Candidate
                            candidate={
                              candidates[formatDate(date)]
                                ? candidates[formatDate(date)][formatTime(time)]
                                : null
                            }
                            height={height}
                            index={index2}
                            onClick={() => {
                              deleteCandidate(
                                date,
                                time,
                                setCandidates,
                                candidates
                              );
                            }}
                          />
                        </Fade>
                        <Button
                          height={`${height}px`}
                          width="full"
                          _hover={{ bg: "rgba(0,0,0,0.1)" }}
                          backgroundColor="rgba(0,0,0,0)"
                          onClick={() => {
                            console.log(date);
                            setCandidate(
                              date,
                              time,
                              scheduleTime,
                              setCandidates,
                              candidates
                            );
                          }}
                        ></Button>
                      </Box>
                    );
                  })}
                </Td>
              );
            })}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Calendar;
