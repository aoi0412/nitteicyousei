import { useRouter } from "next/router";
import Header from "../../src/components/Header";
import StepTitle from "../../src/components/StepTitle";
import WideButton from "../../src/components/WideButton";
import { useWindowResize } from "../../src/function/windowSize";

const ChangeSchedule = () => {
  useWindowResize();
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
    </div>
  );
};

export default ChangeSchedule;
