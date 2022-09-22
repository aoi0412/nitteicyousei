import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { candidates, scheduleData } from "../../types/model";
import { db } from "../firebase";
const baseURL = "https://nitteicyousei-65b1a.web.app/";
export const saveSchedule = (data: scheduleData) => {
  const URL: string = `${baseURL}/schedule/?scheduleID=${data.id}`;
  setDoc(doc(db, "schedules", data.id), {
    id: data.id,
    url: URL,
    scheduleName: data.scheduleName,
    scheduleTime: data.scheduleTime,
    candidates: data.candidates,
    members: [],
  } as scheduleData);
  return { URL: URL, id: data.id };
};

export const updateCandidates = (
  id: string,
  candidates: candidates,
  members: string[]
) => {
  updateDoc(doc(db, "schedules", id), {
    candidates: candidates,
    members: members,
  });
};

export const getScheduleId = () => {
  return doc(collection(db, "schedules")).id;
};
