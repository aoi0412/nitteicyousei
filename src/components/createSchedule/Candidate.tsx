import { Box, Button, Fade, useDisclosure, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { color } from "../../styles/colors";
import { appColor } from "../../types/color";
import { candidate } from "../../types/model";
import { useRecoilValue } from "recoil";
import { candidatesAtom, timeAtom } from "../../database/recoil";
import CandidateModal from "../CandidateModal";
import { addMinutes, format } from "date-fns";

type Props = {
  date: Date;
  row: number;
  column: number;
  height: number;
  updateCandidates: (candidate: candidate) => void;
  deleteCandidates: () => void;
};
const Candidate: FC<Props> = ({
  date,
  column,
  height,
  updateCandidates,
  deleteCandidates,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const time = useRecoilValue(timeAtom);
  const formatTimeRange = () => {
    const tmp: Date = addMinutes(date, time);
    return format(date, "hh':'mm") + "~" + format(tmp, "hh':'mm");
  };
  return (
    <Box
      borderBottomStyle={column % 2 == 0 ? "dotted" : "solid"}
      borderBottomWidth="thin"
      borderColor={color.dark}
      borderRadius="none"
      height={`${height}px`}
      padding="0"
      overflowY="visible"
    >
      <Fade in={isVisible ? true : false}>
        <Box position="relative">
          <Button
            position="absolute"
            bg={color.main}
            padding="0"
            margin="0"
            width="100%"
            height={`${(height * time) / 30}px`}
            zIndex={column + 1}
            borderColor={color.dark}
            borderWidth="0.5px"
            boxShadow="2xl"
            borderRadius="md"
            display="flex"
            alignItems="flex-start"
            onClick={() => {
              setIsVisible(false);
              deleteCandidates();
            }}
          >
            <Text
              height="10"
              display="flex"
              alignItems="center"
              color="white"
              fontWeight="bold"
              fontSize="2xs"
              flexWrap="wrap"
            >
              {formatTimeRange()}
            </Text>
          </Button>
        </Box>
        <CandidateModal date={date} isVisible={isOpen} onClose={onClose} />
      </Fade>
      <Button
        zIndex={column}
        height={`${height}px`}
        width="full"
        _hover={{ bg: "rgba(0,0,0,0.1)" }}
        disabled={isVisible ? true : false}
        backgroundColor="rgba(0,0,0,0)"
        onClick={() => {
          setIsVisible(true);
          updateCandidates({
            startTime: date,
            scheduleTime: time,
            members: [],
          });
        }}
      ></Button>
    </Box>
  );
};

export default Candidate;
