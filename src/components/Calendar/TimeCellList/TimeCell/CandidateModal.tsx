import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { formatTimeRange } from "../../../../function/calendar";
import { color } from "../../../../styles/colors";
import { candidate } from "../../../../types/model";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  candidate: candidate;
};

const CandidateModal: FC<Props> = ({ candidate, isVisible, onClose }) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <ModalOverlay />
      {candidate ? (
        <ModalContent display="flex" alignSelf="center">
          <ModalHeader textAlign="center">
            {formatTimeRange(candidate)}
          </ModalHeader>
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
      ) : (
        <ModalContent>
          <Text>データがありません</Text>
        </ModalContent>
      )}
    </Modal>
  );
};

export default CandidateModal;
