import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { addWeeks, format, subWeeks } from "date-fns";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { calendarWeekDateAtom } from "../../database/recoil";
import { color } from "../../styles/colors";

const ChangeWeekButton = () => {
  const [pageDate, setPageDate] = useRecoilState(calendarWeekDateAtom);
  return (
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
        {format(pageDate, "y' 'M'月'")}
      </Text>
    </Flex>
  );
};

export default ChangeWeekButton;
