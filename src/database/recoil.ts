import { atom } from "recoil";
import { candidate, candidates } from "../types/model";

export const candidatesAtom = atom({
  key: "candidates",
  default: {} as candidates,
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
