import { Box, Flex, Text, Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import StepTitle from "../StepTitle";
import Calendar from "./Calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { color } from "../../styles/colors";
import { subWeeks, addWeeks } from "date-fns";
const Step2 = () => {
  const [pageDate, setPageDate] = useState(new Date());
  return (
    <>
      <Box height="60%" display="flex" flexDir="column" flexGrow={1}>
        <StepTitle stepNum={2}>会議予定の候補を入力</StepTitle>
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
      </Box>
    </>
  );
};

export default Step2;
