export type MyData = {
  userId: string;
  userName: string;
  scheduleName: string;
};

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
