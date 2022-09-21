import {
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Flex,
  useToast,
  Tooltip,
  Fade,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  getScheduleId,
  saveSchedule,
} from "../../database/functions/createSchedule";
import {
  candidatesAtom,
  scheduleNameAtom,
  timeAtom,
} from "../../database/recoil";
import { color } from "../../styles/colors";
import { scheduleData } from "../../types/model";
import WideButton from "../WideButton";

const Step3 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState<string>("正しく作成できていません");
  const [id, setId] = useState<string>(getScheduleId());

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const copyText = (text: string) => {
    // テキストコピー用の一時要素を作成
    const pre = document.createElement("pre");
    // テキストを選択可能にしてテキストセット
    pre.style.webkitUserSelect = "auto";
    pre.style.userSelect = "auto";
    pre.textContent = text;

    // 要素を追加、選択してクリップボードにコピー
    document.body.appendChild(pre);
    document.getSelection()?.selectAllChildren(pre);
    const result = document.execCommand("copy");

    // 要素を削除
    document.body.removeChild(pre);
    setIsCopied(result);
  };
  const candidates = useRecoilValue(candidatesAtom);
  const name = useRecoilValue(scheduleNameAtom);
  const time = useRecoilValue(timeAtom);
  const create = () => {
    const scheduleData: scheduleData = {
      scheduleName: name,
      scheduleTime: time,
      candidates: candidates,
      url: null,
      id: id,
    };
    const result = saveSchedule(scheduleData);
    setUrl(result.URL);
    setId(result.id);
    onOpen();
  };
  return (
    <Box
      zIndex={99}
      position="fixed"
      bottom="20px"
      width="full"
      margin="0"
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
      maxW="970px"
    >
      <Fade in={candidates && name ? true : false}>
        <WideButton onClick={create}>スケージュールを作成</WideButton>
      </Fade>
      <Modal
        size="lg"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent margin="auto">
          <ModalHeader>みんなに共有</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex display="flex" alignItems="center">
              <Text fontSize="20px" color={color.dark}>
                URL
              </Text>
              <Input
                marginX="4"
                value={url}
                disabled
                borderColor={color.dark}
                focusBorderColor={color.dark}
                color={color.dark}
                height="30px"
              />
              <Tooltip
                placement="top"
                closeDelay={500}
                label={isCopied ? "コピーしました！" : "コピー失敗"}
                isOpen={isCopied}
                onClose={() => setIsCopied(false)}
              >
                <Button
                  boxShadow="2xl"
                  color="white"
                  bgColor={color.main}
                  _active={{ bg: color.main }}
                  _hover={{ bg: color.mainHover }}
                  borderRadius="full"
                  paddingX="8"
                  size="sm"
                  onClick={() => {
                    copyText(url);
                  }}
                >
                  コピー
                </Button>
              </Tooltip>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              borderColor={color.sub}
              color={color.sub}
              mr={3}
              variant="outline"
              onClick={() => {
                onClose();
              }}
            >
              編集に戻る
            </Button>
            <Button
              bg={color.main}
              color="white"
              onClick={() => {
                onClose();
                router.push(`/schedule/?scheduleID=${id}`);
              }}
              _hover={{ bg: color.mainHover }}
            >
              自分の予定を入力する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Step3;
