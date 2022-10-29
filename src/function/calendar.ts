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
  addMinutes,
} from "date-fns";
import ja from "date-fns/locale/ja";
import { candidate, candidates, mode } from "../types/model";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  candidatesAtom,
  memberNameAtom,
  membersAtom,
  timeAtom,
} from "../database/recoil";
import { Timestamp } from "firebase/firestore";
import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal, useDisclosure } from "@chakra-ui/react";
import { color } from "../styles/colors";

export const getWeekList = (date: Date) => {
  const sunday = previousSunday(date);
  const nextsaturday = nextSaturday(sunday);
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
  const tmp = format(date, "Y'/'M'/'d");
  // const tmp = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  return tmp;
};

export const formatTimeRange = (candidate: candidate) => {
  if (candidate) {
    let startTime = candidate.startTime;
    if (Object.prototype.toString.call(startTime) !== "[object Date]") {
      startTime = new Date((startTime as unknown as Timestamp).seconds * 1000);
    }
    const tmp: Date = addMinutes(startTime, candidate.scheduleTime);

    return format(startTime, "hh':'mm") + "~" + format(tmp, "hh':'mm");
  }
};

export const getJaWeekString = (weekList: Date[]) => {
  let jaWeekList: string[] = [];
  weekList.forEach((date) => {
    jaWeekList.push(format(date, "EEEEE", { locale: ja }));
  });
  return jaWeekList;
};
export const useCandidateFunc = (
  date: Date,
  time: { Hour: number; Minute: number },
  type: mode
) => {
  const [isSelected, setIdSelected] = useState(false);
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const scheduleTime = useRecoilValue(timeAtom);
  const nameRef = useRef("");
  const name = useRecoilValue(memberNameAtom);

  const getCandidateScheduleTime = () => {
    const tmp = candidates[formatDate(date)][formatTime(time)].scheduleTime;
    return tmp;
  };

  const deleteMember = (name: string) => {
    const candidate = candidates[formatDate(date)][formatTime(time)];
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...candidate.members];
    if (members.some((member) => member.name === name)) {
      members = members.filter((member) => member.name !== name);
    }
    const tmp: candidate = {
      ...candidate,
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;

    setCandidates(tmpC);
  };
  const addMember = (name: string) => {
    const candidate = candidates[formatDate(date)][formatTime(time)];
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...candidate.members];
    if (!members.some((member) => member.name === name)) {
      members.push({ name: name });
    }

    const tmp: candidate = {
      ...candidate,
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;

    setCandidates(tmpC);
  };
  const updateMember = (before: string, after: string) => {
    const candidate = candidates[formatDate(date)][formatTime(time)];
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...candidate.members];
    if (members.some((member) => member.name === before)) {
      members = members.filter((member) => member.name !== before);
    }
    if (!members.some((member) => member.name === after)) {
      members.push({ name: after });
    }

    const tmp: candidate = {
      ...candidate,
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;

    setCandidates(tmpC);
  };

  // return {
  //   setCandidate,
  //   deleteCandidate,
  //   getCandidateScheduleTime,
  //   isSelected,
  // };
};
// type returnFunc = {pushCandidate:()=>void,pushCell:()=>void};

const useCandidateView = (
  date: Date,
  time: { Hour: number; Minute: number }
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const getCandidate = () => {
    return candidates[formatDate(date)][formatTime(time)];
  };
  const members = useRecoilValue(membersAtom);
  const bgColor = () => {
    let tmp = color.dark;

    const ratio = getCandidate().members.length / members.length;
    if (ratio < 0.25) {
      tmp = color.sub;
    } else if (ratio < 0.5) {
      tmp = color.mainHover;
    } else if (ratio < 0.75) {
      tmp = color.main;
    } else if (ratio == 1) {
      tmp = "green.300";
    } else {
      tmp = color.accent;
    }
    return tmp;
  };
  const timeRangeString = () => {
    return formatTimeRange(getCandidate());
  };
  const pushCandidate = () => {
    onOpen();
  };
  const pushCell = () => {};

  return {
    pushCandidate,
    pushCell,
    otherFunc: {
      bgColor,
      isOpen,
      onClose,
      timeRangeString,
    },
  };
};
const useCandidateChange = (
  date: Date,
  time: { Hour: number; Minute: number }
) => {
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const scheduleTime = useRecoilValue(timeAtom);
  const deleteCandidate = () => {
    let tmp = { ...candidates };
    console.log("will delete", tmp);
    tmp[formatDate(date)] = { ...candidates[formatDate(date)] };
    delete tmp[formatDate(date)][formatTime(time)];
    if (Object.keys(tmp[formatDate(date)]).length === 0) {
      delete tmp[formatDate(date)];
    }
    console.log("deleted", tmp);
    setCandidates(tmp);
  };
  const setCandidate = () => {
    let tmp = { ...candidates };
    console.log("date is", date);
    let dateData = setHours(date, time.Hour);
    dateData = setMinutes(dateData, time.Minute);
    console.log("dateData is", dateData);
    const candidate: candidate = {
      startTime: dateData,
      scheduleTime: scheduleTime,
      members: [],
    };
    console.log("pushed to ", formatDate(date));
    if (!(formatDate(date) in tmp)) {
      tmp[formatDate(date)] = {};
    } else {
      tmp[formatDate(date)] = { ...candidates[formatDate(date)] };
    }
    tmp[formatDate(date)][formatTime(time)] = candidate;

    setCandidates(tmp);
  };
  const pushCandidate = () => {
    deleteCandidate();
  };
  const pushCell = () => {
    setCandidate();
  };
  return {
    pushCandidate,
    pushCell,
    otherFunc: {},
  };
};

const useCandidateJoinIn = (
  date: Date,
  time: { Hour: number; Minute: number }
) => {
  const [candidates, setCandidates] = useRecoilState(candidatesAtom);
  const nameRef = useRef("");
  const name = useRecoilValue(memberNameAtom);
  const [isSelected, setIsSelected] = useState(false);
  useLayoutEffect(() => {
    if (
      formatDate(date) in candidates &&
      formatTime(time) in candidates[formatDate(date)]
    ) {
      if (name == "" && nameRef.current !== "") {
      } else if (
        getCandidate().members.find((member) => member.name === name) &&
        name !== nameRef.current
      ) {
        setIsSelected(true);
        nameRef.current = name;
      } else {
        if (isSelected) {
          updateMember(nameRef.current, name);
        }
        nameRef.current = name;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  const getCandidate = () => {
    console.log(candidates);

    return candidates[formatDate(date)][formatTime(time)];
  };
  const deleteMember = (name: string) => {
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...getCandidate().members];
    if (members.some((member) => member.name === name)) {
      members = members.filter((member) => member.name !== name);
    }
    const tmp: candidate = {
      ...getCandidate(),
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;

    setCandidates(tmpC);
  };
  const addMember = (name: string) => {
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...getCandidate().members];
    if (!members.some((member) => member.name === name)) {
      members.push({ name: name });
    }

    const tmp: candidate = {
      ...getCandidate(),
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;

    setCandidates(tmpC);
  };
  const updateMember = (before: string, after: string) => {
    let tmpC = { ...candidates };
    tmpC[formatDate(date)] = { ...candidates[formatDate(date)] };
    let members = [...getCandidate().members];
    if (members.some((member) => member.name === before)) {
      members = members.filter((member) => member.name !== before);
    }
    if (!members.some((member) => member.name === after)) {
      members.push({ name: after });
    }

    const tmp: candidate = {
      ...getCandidate(),
      members: members,
    };
    tmpC[formatDate(date)][formatTime(time)] = tmp;

    setCandidates(tmpC);
  };
  const pushCandidate = () => {
    if (name) {
      if (isSelected) {
        deleteMember(name);
        setIsSelected(false);
      } else {
        addMember(name);
        setIsSelected(true);
      }
    } else {
      alert("名前を入力してください");
    }
  };
  const pushCell = () => {};
  return { pushCandidate, pushCell, otherFunc: { isSelected } };
};

export const devideCustomHooks = (mode: mode) => {
  if (mode == "change") {
    return useCandidateChange;
  } else if (mode == "joinIn") {
    return useCandidateJoinIn;
  } else {
    return useCandidateView;
  }
};
