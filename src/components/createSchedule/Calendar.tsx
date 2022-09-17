import {
  Box,
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
import { FC, useLayoutEffect, useState } from "react";
import {
  getEachMinute,
  getJaWeekString,
  getWeekList,
} from "../../function/calendar";
import { color } from "../../styles/colors";
import { candidate } from "../../types/model";
import Candidate from "./Candidate";
import { format } from "date-fns";
type Props = {
  date: Date;
};
const Calendar: FC<Props> = ({ date }) => {
  const candidates: candidate[] = [];
  const [header, setHeader] = useState<{ day: number; dayOfWeek: string }[]>(
    []
  );
  const height = 30;
  const [minuteList, setMinuteList] = useState<Date[][]>([]);
  useLayoutEffect(() => {
    const temp = getWeekList(date);
    const jaWeek = getJaWeekString(temp);
    const temp2: { day: number; dayOfWeek: string }[] = [];
    const temp4: Date[][] = [];
    temp.forEach((date, index) => {
      const temp3 = date.getDate();
      const temp5 = getEachMinute(date);
      temp4.push(temp5);
      temp2.push({
        day: temp3,
        dayOfWeek: jaWeek[index],
      });
    });
    setHeader(temp2);
    setMinuteList(temp4);
  }, [date]);
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
            {header.map((data) => {
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
                  <Text>{data.day}</Text>
                  <Text>{data.dayOfWeek}</Text>
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
              {minuteList[0]?.slice(1).map((date) => (
                <Text
                  height={`${height}px`}
                  verticalAlign="center"
                  fontSize="sm"
                >
                  {format(date, "HH':'mm")}
                </Text>
              ))}
            </Td>
            {minuteList.map((dataList, index) => {
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
                  {dataList.map((date, index2) => (
                    <Candidate
                      height={height}
                      date={date}
                      row={index}
                      column={index2}
                      updateCandidates={(candidate: candidate) => {
                        if (
                          !candidates.find(
                            (candidate) => candidate.startTime === date
                          )
                        ) {
                          candidates.push(candidate);
                        }
                      }}
                      deleteCandidates={() => {
                        candidates.filter((data) => data.startTime !== date);
                      }}
                    />
                  ))}
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
