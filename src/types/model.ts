export type scheduleData = {
  scheduleName: string;
  scheduleTime: number;
  url: string | null;
  candidates: candidates;
  id: string;
  members: string[];
};

export type candidates = {
  [date: string]: {
    [time: string]: candidate;
  };
};

export type candidate = {
  startTime: Date;
  scheduleTime: number;
  members: member[];
};

export type member = {
  name: string;
};

export type mode = "change" | "joinIn" | "view";

//自分の日程入力時に使用するデータ
export type tmpUserData = {
  name: string;
  candidateTimes: { date: string; time: string; startTime: Date }[];
};
