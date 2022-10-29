import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getScheduleData = (
  id: string,
  then: (data: DocumentData) => void
) => {
  return onSnapshot(doc(db, "schedules", id), (datas) => {
    if (datas) {
      console.log("data is", datas.data());
      const tmp = datas.data();
      if (tmp) then(tmp);
      else console.log("データがうまく取得できませんでした");
    } else {
      console.log("データがうまく取得できませんでした");
    }
  });
};
