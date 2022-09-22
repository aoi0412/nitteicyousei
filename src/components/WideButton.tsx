import { Button } from "@chakra-ui/react";
import { CSSProperties, FC } from "react";
import { color } from "../styles/colors";
import { appColor } from "../types/color";
type Props = {
  children: string;
  onClick: () => void;
};
const WideButton: FC<Props> = ({ children, onClick }) => {
  return (
    <Button
      boxShadow="2xl"
      color="white"
      bgColor={color.main}
      _active={{ bg: color.main }}
      _hover={{ bg: color.mainHover }}
      borderRadius="full"
      width="80%"
      minW="300px"
      maxW="500px"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default WideButton;
