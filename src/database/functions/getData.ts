import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getScheduleData = (id: string, then: (data: any) => void) => {
  return onSnapshot(doc(db, "schedules", id), (data) => {
    then(data);
  });
};
