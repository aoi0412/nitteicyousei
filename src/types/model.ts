export type scheduleData = {
  scheduleName: string;
  scheduleTime: number;
  url: string | null;
  candidates: candidates;
  id: string;
  members: string[];
};

// 候補時間と参加メンバー
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

// 候補時間と、自分がその時間に参加できるかのBoolean
export type joinInCandidates = {
  [date: string]: {
    [time: string]: joinInCandidate;
  };
};

export type joinInCandidate = {
  startTime: Date;
  scheduleTime: number;
  isJoin: boolean;
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
