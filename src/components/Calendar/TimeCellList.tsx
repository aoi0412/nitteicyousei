import {
  Text,
  Box,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { calendarWeekDateAtom } from "../../database/recoil";
import {
  formatTime,
  getEachMinute,
  getWeekList,
} from "../../function/calendar";
import { color } from "../../styles/colors";
import TimeCell from "./TimeCellList/TimeCell";
type Props = {};
const TimeCellList: FC<Props> = () => {
  const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
  const calendarWeekDate = useRecoilValue(calendarWeekDateAtom);
  const minuteList = getEachMinute();
  const weekList = getWeekList(calendarWeekDate);
  return (
    <Box height="100%" width="100%">
      <TableContainer width="full" padding="4" paddingTop="0">
        <Table display="flex" flexDir="column" position="relative" flexGrow={1}>
          <Thead padding="0" width="full" maxW="970px" zIndex={99}>
            <Tr display="flex" padding="0" marginRight="17px">
              <Th
                borderRightWidth="thin"
                borderColor={color.dark}
                padding="0"
                height="30px"
                width="42px"
              ></Th>
              {dayOfWeekList.map((dayOfWeek, index) => {
                return (
                  <Th
                    height="30px"
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
          <Tbody padding="0" overflowY="scroll">
            <Tr display="flex">
              <Td
                padding="0"
                paddingRight="2"
                borderRightWidth="thin"
                borderColor={color.dark}
              >
                <Box height={`${30 - 12}px`}></Box>
                {minuteList.slice(1).map((data) => (
                  <Text
                    height="30px"
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
                      return (
                        <Box
                          key={time.Hour + time.Minute}
                          borderBottomStyle={
                            index2 % 2 == 0 ? "dotted" : "solid"
                          }
                          borderBottomWidth="thin"
                          borderColor={color.dark}
                          borderRadius="none"
                          height="30px"
                          padding="0"
                          position="relative"
                        >
                          <TimeCell date={date} time={time} index={index2} />
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
    </Box>
  );
};

export default TimeCellList;
