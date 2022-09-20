import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getScheduleData = (id: string) => {
  return getDoc(doc(db, "schedules", id));
};
