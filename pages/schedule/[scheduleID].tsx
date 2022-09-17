import { useRouter } from "next/router";
import Calendar from "../../src/components/createSchedule/Calendar";
import Candidate from "../../src/components/createSchedule/Candidate";
import Header from "../../src/components/Header";
import StepTitle from "../../src/components/StepTitle";
import WideButton from "../../src/components/WideButton";

const SchedulePage = () => {
  const router = useRouter();
  const { scheduleID } = router.query;

  return (
    <div>
      <Header />
      <WideButton onClick={() => console.log("clicked")}>
        自分の予定を入力する
      </WideButton>
      <h1>{scheduleID}</h1>
      <StepTitle stepNum={1}>会議内容を入力</StepTitle>
      <StepTitle stepNum={1}>会議予定の候補を選択</StepTitle>
      {/* <Calendar></Calendar> */}
    </div>
  );
};

export default SchedulePage;
