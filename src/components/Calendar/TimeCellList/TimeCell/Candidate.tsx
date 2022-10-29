import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Fade, Icon, Text } from "@chakra-ui/react";
import { Children, FC, ReactNode, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { candidatesAtom, windowSizeAtom } from "../../../../database/recoil";
import {
  formatDate,
  formatTime,
  formatTimeRange,
} from "../../../../function/calendar";
import { color } from "../../../../styles/colors";
import { candidate, mode } from "../../../../types/model";
import CandidateModal from "./CandidateModal";

type Props = {
  isVisible?: boolean;
  mode: mode;
  index: number;
  onClick: () => void;
  date: Date;
  time: { Hour: number; Minute: number };
  otherFunc: any;
};
const Candidate: FC<Props> = ({
  otherFunc,
  index,
  onClick,
  date,
  time,
  mode,
}) => {
  const candidates = useRecoilValue(candidatesAtom);
  const width = useRecoilValue(windowSizeAtom).width;
  const candidate = useMemo(() => {
    if (
      formatDate(date) in candidates &&
      formatTime(time) in candidates[formatDate(date)]
    ) {
      return candidates[formatDate(date)][formatTime(time)];
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates]);
  return (
    <Fade in={candidate ? true : false} unmountOnExit>
      {candidate && (
        <Button
          position="absolute"
          zIndex={index + 1}
          bg={mode === "view" ? otherFunc.bgColor : color.main}
          _hover={{ bg: color.main }}
          padding="0"
          margin="0"
          height={`${(candidate.scheduleTime * 30) / 30}px`}
          borderColor="white"
          borderTopWidth="0.5px"
          boxShadow="2xl"
          borderRadius="md"
          display="flex"
          alignItems="flex-start"
          onClick={onClick}
          width="80%"
          minW="20px"
        >
          {mode == "change" ? (
            <Fade in={width > 880}>
              <Text>{formatTimeRange(candidate)}</Text>
            </Fade>
          ) : mode == "joinIn" ? (
            <Fade in={otherFunc.isSelected}>
              <Icon as={CheckIcon} color="white" margin="4" />
            </Fade>
          ) : (
            <Box>
              <Fade in={width > 880}>
                <Text>{formatTimeRange(candidate)}</Text>
              </Fade>
              <CandidateModal
                candidate={candidate}
                isVisible={otherFunc.isOpen}
                onClose={otherFunc.onClose}
              />
            </Box>
          )}
        </Button>
      )}
    </Fade>
  );
};

export default Candidate;
