import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { appColor } from "../types/color";

const Header = () => {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundColor: appColor.main,
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
      }}
    >
      <Box
        onClick={() => router.replace("/")}
        display="flex"
        alignItems="center"
        flexDir="column"
      >
        <Flex gap="2" alignItems="center">
          <Icon width="24px" height="24px" as={CalendarIcon} color="white" />
          <Text fontSize="20" fontWeight="bold" color="white">
            すけちょ
          </Text>
        </Flex>
        <Text fontSize="12" fontWeight="bold" color="white">
          サクッとスケジュール調整
        </Text>
      </Box>
    </div>
  );
};

export default Header;
