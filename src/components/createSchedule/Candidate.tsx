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
import { start } from "repl";
import { Timestamp } from "firebase/firestore";

type Props = {
  candidate: candidate | null;
  index: number;
  onClick: () => void;
  height: number;
};
const Candidate: FC<Props> = ({ candidate, height, index, onClick }) => {
  const formatTimeRange = () => {
    if (candidate) {
      let startTime = candidate.startTime;
      if (Object.prototype.toString.call(startTime) !== "[object Date]") {
        startTime = new Date(
          (startTime as unknown as Timestamp).seconds * 1000
        );
      }
      const tmp: Date = addMinutes(startTime, candidate.scheduleTime);

      return format(startTime, "hh':'mm") + "~" + format(tmp, "hh':'mm");
    }
  };
  if (!candidate) return <></>;
  return (
    <Button
      position="absolute"
      zIndex={index + 1}
      bg={color.main}
      _hover={{ bg: color.main }}
      padding="0"
      margin="0"
      height={`${(candidate.scheduleTime * height) / 30}px`}
      borderColor="white"
      borderTopWidth="0.5px"
      boxShadow="2xl"
      borderRadius="md"
      display="flex"
      alignItems="flex-start"
      onClick={onClick}
    >
      <Text
        height={height}
        display="flex"
        alignItems="center"
        color="white"
        fontWeight="bold"
        fontSize="2xs"
        overflowWrap="break-word"
      >
        {formatTimeRange()}
      </Text>
    </Button>
  );
};

export default Candidate;
