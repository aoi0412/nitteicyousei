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
} from "@chakra-ui/react";
import { FC } from "react";
import { color } from "../../styles/colors";
import { candidate } from "../../types/model";
import { addMinutes, format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { CheckIcon, SunIcon } from "@chakra-ui/icons";

type Props = {
  candidate: candidate;
  index: number;
  height: number;
};
const Candidate: FC<Props> = ({ candidate, height, index }) => {
  const formatTimeRange = () => {
    let startTime = candidate.startTime;
    if (Object.prototype.toString.call(startTime) !== "[object Date]") {
      startTime = new Date((startTime as unknown as Timestamp).seconds * 1000);
    }
    const tmp: Date = addMinutes(startTime, candidate.scheduleTime);

    return format(startTime, "hh':'mm") + "~" + format(tmp, "hh':'mm");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
