import { collection, doc, setDoc } from "firebase/firestore";
import { scheduleData } from "../../types/model";
import { db } from "../firebase";
const baseURL = "http://localhost:3000";
export const saveSchedule = (data: scheduleData) => {
  const URL: string = `${baseURL}/schedule/${data.id}`;
  setDoc(doc(db, "schedules", data.id), {
    id: data.id,
    url: URL,
    scheduleName: data.scheduleName,
    scheduleTime: data.scheduleTime,
    candidates: data.candidates,
  } as scheduleData);
  return { URL: URL, id: data.id };
};

export const getScheduleId = () => {
  return doc(collection(db, "schedules")).id;
};
