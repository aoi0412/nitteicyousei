import {
  Box,
  Button,
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
import { FC, useEffect, useLayoutEffect, useState } from "react";
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
import { candidate, member } from "../../types/model";
import Candidate from "./Candidate";
import { lightFormat } from "date-fns";
import { format } from "path";
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
  console.log(candidates);
  return (
    <TableContainer width="full" padding="4">
      <Table>
        <Thead padding="0">
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
                >
                  <Text>{weekList[index].getDate()}</Text>
                  <Text>{dayOfWeek}</Text>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
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
                >
                  {formatTime(data)}
                </Text>
              ))}
            </Td>
            {weekList.map((date) => {
              return (
                <Td
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
                    const [isCandidateIn, setIsCendidateIn] = useState(false);
                    return (
                      <Box
                        borderBottomStyle={index2 % 2 == 0 ? "dotted" : "solid"}
                        borderBottomWidth="thin"
                        borderColor={color.dark}
                        borderRadius="none"
                        height={`${height}px`}
                        padding="0"
                        overflowY="visible"
                      >
                        {formatDate(date) in candidates &&
                          formatTime(time) in candidates[formatDate(date)] && (
                            <Candidate
                              candidate={
                                candidates[formatDate(date)][formatTime(time)]
                              }
                              height={height}
                              index={index2}
                              onClick={() => {
                                setIsCendidateIn(false);
                                deleteCandidate(
                                  date,
                                  time,
                                  setCandidates,
                                  candidates
                                );
                              }}
                            />
                          )}
                        <Button
                          height={`${height}px`}
                          width="full"
                          _hover={{ bg: "rgba(0,0,0,0.1)" }}
                          backgroundColor="rgba(0,0,0,0)"
                          onClick={() => {
                            setCandidate(
                              date,
                              time,
                              scheduleTime,
                              setCandidates,
                              candidates
                            );
                            setIsCendidateIn(true);
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
