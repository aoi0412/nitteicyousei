import { Box, Button, Fade, useDisclosure, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { color } from "../../styles/colors";
import { appColor } from "../../types/color";
import { candidate } from "../../types/model";
import { useRecoilValue } from "recoil";
import { candidatesAtom, timeAtom } from "../../database/recoil";
import CandidateModal from "../CandidateModal";
import { addMinutes, format } from "date-fns";
import { deleteCandidate } from "../../function/calendar";

type Props = {
  candidate: candidate;
  index: number;
  onClick: () => void;
  height: number;
};
const Candidate: FC<Props> = ({ candidate, height, index, onClick }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const formatTimeRange = () => {
    const tmp: Date = addMinutes(candidate.startTime, candidate.scheduleTime);
    return (
      format(candidate.startTime, "hh':'mm") + "~" + format(tmp, "hh':'mm")
    );
  };
  console.log("rendered!!");
  return (
    <Fade in>
      <Box position="relative">
        <Button
          position="absolute"
          zIndex={index + 1}
          bg={color.main}
          padding="0"
          margin="0"
          width="100%"
          height={`${(candidate.scheduleTime * height) / 30}px`}
          borderColor={color.dark}
          borderWidth="0.5px"
          boxShadow="2xl"
          borderRadius="md"
          display="flex"
          alignItems="flex-start"
          onClick={onClick}
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
      {/* <CandidateModal
        date={candidate.startTime}
        isVisible={isOpen}
        onClose={onClose}
      /> */}
    </Fade>
  );
};

export default Candidate;
