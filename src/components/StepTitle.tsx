import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { color } from "../styles/colors";
import stringWidth from "string-width";
type Props = {
  stepNum: number;
  children: string;
};
const StepTitle: FC<Props> = ({ stepNum, children }) => {
  const [fontSize, setFontSize] = useState("auto");
  useEffect(() => {
    const sizePx = (200 / stringWidth(children)) * 2;
    setFontSize(`${sizePx > 20 ? 20 : sizePx}px`);
  }, []);
  return (
    <Flex display="flex" flexDir="row" margin="1.5">
      <Box
        borderRadius="full"
        bgColor={color.sub}
        color="white"
        width="32"
        height="8"
        textAlign="center"
        lineHeight="8"
        fontWeight="bold"
      >
        STEP{stepNum}
      </Box>
      <Text as="b" fontSize={fontSize} lineHeight="8" paddingX={4}>
        {children}
      </Text>
    </Flex>
  );
};

export default StepTitle;
