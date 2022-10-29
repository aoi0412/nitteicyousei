import { Box, Button, Text } from "@chakra-ui/react";
import { FC, ReactNode, useContext } from "react";
import { devideCustomHooks } from "../../../function/calendar";

import { color } from "../../../styles/colors";
import { ModeContext } from "../../Calendar";
import CandidateModal from "./TimeCell/CandidateModal";
import Candidate from "./TimeCell/Candidate";
type Props = {
  index: number;
  date: Date;
  time: { Hour: number; Minute: number };
};
const TimeCell: FC<Props> = ({ index, date, time }) => {
  const mode = useContext(ModeContext);
  const custom = devideCustomHooks(mode);
  const candidateFunc = custom(date, time);
  return (
    <Box
      borderBottomStyle={index % 2 == 0 ? "dotted" : "solid"}
      borderBottomWidth="thin"
      borderColor={color.dark}
      borderRadius="none"
      height="30px"
      padding="0"
      position="relative"
    >
      <Candidate
        otherFunc={candidateFunc.otherFunc}
        mode={mode}
        date={date}
        time={time}
        onClick={candidateFunc.pushCandidate}
        index={index}
      />
      <Button
        height="30px"
        width="full"
        _hover={{ bg: "rgba(0,0,0,0.1)" }}
        backgroundColor="rgba(0,0,0,0)"
        onClick={candidateFunc.pushCell}
      />
    </Box>
  );
};

export default TimeCell;
