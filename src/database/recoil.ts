import { atom } from "recoil";
import { candidate } from "../types/model";

export const candidatesAtom = atom({
  key: "candidates",
  default: [] as candidate[],
});

export const timeAtom = atom({
  key: "time",
  default: 60,
});
