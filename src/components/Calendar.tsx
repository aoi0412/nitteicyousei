import { Box } from "@chakra-ui/react";
import { createContext, FC, ReactNode } from "react";
import { mode } from "../types/model";
import ChangeWeekButton from "./Calendar/ChangeWeekButton";
import TimeCellList from "./Calendar/TimeCellList";
type Props = {
  mode: "change" | "view" | "joinIn";
};
export const ModeContext = createContext<mode>("view");
const Calendar: FC<Props> = ({ mode }) => {
  return (
    <>
      <ModeContext.Provider value={mode}>
        <ChangeWeekButton />
        <TimeCellList />
      </ModeContext.Provider>
    </>
  );
};

export default Calendar;
