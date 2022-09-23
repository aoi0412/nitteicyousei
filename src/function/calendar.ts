import {
  previousSunday,
  nextSaturday,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  eachMinuteOfInterval,
  format,
  setHours,
  setMinutes,
} from "date-fns";
import ja from "date-fns/locale/ja";
import { candidate, candidates } from "../types/model";
import { useRecoilState } from "recoil";
import { candidatesAtom } from "../database/recoil";

export const getWeekList = (date: Date) => {
  console.log("today is", date.toString());
  const sunday = previousSunday(date);
  console.log("priviousSunday is", sunday.toString());
  const nextsaturday = nextSaturday(sunday);
  console.log("nextsaturday is", nextsaturday.toString());
  const weekList: Date[] = eachDayOfInterval({
    start: sunday,
    end: nextsaturday,
  });

  return weekList;
};

export const getEachMinute = () => {
  let tmp: { Hour: number; Minute: number }[] = [];
  for (let i = 0; i < 24; i++) {
    tmp.push({
      Hour: i,
      Minute: 0,
    });
    tmp.push({
      Hour: i,
      Minute: 30,
    });
  }
  return tmp;
};

export const formatTime = (data: { Hour: number; Minute: number }) => {
  let hour = data.Hour.toString();
  let minute = data.Minute.toString();
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  return hour + ":" + minute;
};

export const formatDate = (date: Date) => {
  const tmp = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  return tmp;
};

export const getJaWeekString = (weekList: Date[]) => {
  let jaWeekList: string[] = [];
  weekList.forEach((date) => {
    jaWeekList.push(format(date, "EEEEE", { locale: ja }));
  });
  return jaWeekList;
};

export const setCandidate = (
  date: Date,
  time: { Hour: number; Minute: number },
  scheduleTime: number,
  setCandidates: (candidates: candidates) => void,
  candidates: candidates
) => {
  let tmp = { ...candidates };
  let dateData = setHours(new Date(date), time.Hour);
  dateData = setMinutes(new Date(dateData), time.Minute);
  const candidate: candidate = {
    startTime: dateData,
    scheduleTime: scheduleTime,
    members: [],
  };

  if (!(formatDate(date) in tmp)) {
    tmp[formatDate(date)] = {};
  } else {
    tmp[formatDate(date)] = { ...candidates[formatDate(date)] };
  }
  tmp[formatDate(date)][formatTime(time)] = candidate;

  setCandidates(tmp);
};

export const deleteCandidate = (
  date: Date,
  time: { Hour: number; Minute: number },
  setCandidates: (candidates: candidates) => void,
  candidates: candidates
) => {
  let tmp = { ...candidates };
  tmp[formatDate(date)] = { ...candidates[formatDate(date)] };
  delete tmp[formatDate(date)][formatTime(time)];
  if (Object.keys(tmp[formatDate(date)]).length === 0) {
    delete tmp[formatDate(date)];
  }
  setCandidates(tmp);
};
