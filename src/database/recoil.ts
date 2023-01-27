import { atom } from "recoil";
import { candidate, candidates, joinInCandidates } from "../types/model";

// 候補時間と参加メンバー
export const candidatesAtom = atom<candidates>({
  key: "candidates",
  default: {},
});

// 候補時間と、自分がその時間に参加できるかのBoolean
export const joinInCandidatesAtom = atom<joinInCandidates>({
  key: "joinInCandidates",
  default: {},
});

export const timeAtom = atom({
  key: "time",
  default: 60,
});

export const scheduleNameAtom = atom({
  key: "scheduleName",
  default: "",
});

export const memberNameAtom = atom({
  key: "memberName",
  default: "",
});

export const membersAtom = atom({
  key: "members",
  default: [],
});

export const calendarWeekDateAtom = atom({
  key: "calendarWeek",
  default: new Date(),
});

export const windowSizeAtom = atom({
  key: "windowSize",
  default: {
    height: 0,
    width: 0,
  },
});
