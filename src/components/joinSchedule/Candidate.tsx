import { Box, Button, Fade, useDisclosure, Text, Icon } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { color } from "../../styles/colors";
import { appColor } from "../../types/color";
import { candidate, candidates } from "../../types/model";
import { useRecoilValue } from "recoil";
import {
  candidatesAtom,
  memberNameAtom,
  timeAtom,
} from "../../database/recoil";
import CandidateModal from "../CandidateModal";
import { addMinutes, format } from "date-fns";
import {
  deleteCandidate,
  formatDate,
  formatTime,
} from "../../function/calendar";
import { start } from "repl";
import { Timestamp } from "firebase/firestore";
import { CheckIcon } from "@chakra-ui/icons";

type Props = {
  candidate: candidate;
  index: number;
  height: number;
  candidates: candidates;
  setCandidates: (a: candidates) => void;
  date: Date;
  time: { Hour: number; Minute: number };
};
const Candidate: FC<Props> = ({
  date,
  time,
  candidate,
  height,
  index,
  candidates,
  setCandidates,
}) => {
  const nameRef = useRef("");
  const [isSelected, setIsSelected] = useState(false);
  const name = useRecoilValue(memberNameAtom);
  const onClick = (tmpName: string) => {
    console.log(tmpName);
    if (tmpName) {
      if (isSelected) {
        deleteMember(tmpName);
        setIsSelected(false);
      } else {
        addMember(tmpName);
        setIsSelected(true);
      }
    } else {
      alert("名前を入力してください");
    }
  };
  const deleteMember = (name: string) => {
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...candidate.members];
    if (members.some((member) => member.name === name)) {
      members = members.filter((member) => member.name !== name);
    }
    const tmp: candidate = {
      ...candidate,
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;
    console.log("deleted", name, ":", tmpC);

    setCandidates(tmpC);
  };
  const addMember = (name: string) => {
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...candidate.members];
    if (!members.some((member) => member.name === name)) {
      members.push({ name: name });
    }

    const tmp: candidate = {
      ...candidate,
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;
    console.log("added", name, ":", tmpC);

    setCandidates(tmpC);
  };

  const updateMember = (before: string, after: string) => {
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...candidate.members];
    if (members.some((member) => member.name === before)) {
      members = members.filter((member) => member.name !== before);
    }
    if (!members.some((member) => member.name === after)) {
      members.push({ name: after });
    }

    const tmp: candidate = {
      ...candidate,
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;
    console.log("updated", before, "=>", after, ":", tmpC);

    setCandidates(tmpC);
  };
  useEffect(() => {
    if (name == "" && nameRef.current !== "") {
    } else {
      if (isSelected) {
        updateMember(nameRef.current, name);
      }
      nameRef.current = name;
    }
  }, [name]);
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
      onClick={() => onClick(name)}
    >
      <Fade in={isSelected}>
        <Icon as={CheckIcon} color="white" marginY="8px" />
      </Fade>
    </Button>
  );
};

export default Candidate;
