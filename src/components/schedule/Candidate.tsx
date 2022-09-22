import {
  Button,
  useDisclosure,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Icon,
  Box,
  Flex,
  ResponsiveValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { color } from "../../styles/colors";
import { candidate } from "../../types/model";
import { addMinutes, format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { CheckIcon, SunIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { membersAtom } from "../../database/recoil";

type Props = {
  candidate: candidate;
  index: number;
  height: number;
  width?: number;
  position?: "relative" | "absolute" | "fixed";
};
const Candidate: FC<Props> = ({
  candidate,
  height,
  index,
  width,
  position,
}) => {
  const formatTimeRange = () => {
    let startTime = candidate.startTime;
    if (Object.prototype.toString.call(startTime) !== "[object Date]") {
      startTime = new Date((startTime as unknown as Timestamp).seconds * 1000);
    }
    const tmp: Date = addMinutes(startTime, candidate.scheduleTime);

    return (
      format(startTime, "M'/'d' ") +
      format(startTime, "hh':'mm") +
      "~" +
      format(tmp, "hh':'mm")
    );
  };
  const members = useRecoilValue(membersAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = () => {
    let tmp = color.dark;
    const ratio = candidate.members.length / members.length;
    if (ratio < 0.25) {
      tmp = color.sub;
    } else if (ratio < 0.5) {
      tmp = color.mainHover;
    } else if (ratio < 0.75) {
      tmp = color.main;
    } else if (ratio == 1) {
      tmp = "green.300";
    } else {
      tmp = color.accent;
    }
    return tmp;
  };
  return (
    <>
      <Button
        position={position ? position : "absolute"}
        width={width ? width : "auto"}
        zIndex={index + 1}
        bg={bgColor()}
        _hover={{ bg: "rgba(0,0,0,0.2)" }}
        padding="0"
        margin="0"
        height={`${(candidate.scheduleTime * height) / 30}px`}
        borderColor="white"
        borderTopWidth="0.5px"
        boxShadow="2xl"
        borderRadius="md"
        display="flex"
        alignItems="flex-start"
        onClick={onOpen}
      >
        <Flex alignItems="center">
          <Icon as={CheckIcon} color="white" width="3" />
          <Text
            height={height}
            display="flex"
            alignItems="center"
            color="white"
            fontWeight="bold"
            fontSize="2xs"
            overflowWrap="break-word"
            paddingX="1"
          >
            {candidate.members.length}
          </Text>
        </Flex>
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent display="flex" alignSelf="center">
          <ModalHeader textAlign="center">{formatTimeRange()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="4">
            <Text fontWeight="bold" color={color.dark} fontSize="20">
              参加者{candidate.members.length}人
            </Text>
            {candidate.members?.map((member) => (
              <Text key={member.name}>{member.name}</Text>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Candidate;
