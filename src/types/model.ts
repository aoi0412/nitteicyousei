export type MyData = {
  userId: string;
  userName: string;
  scheduleName: string;
};

export type scheduleData = {
  scheduleName: string;
  scheduleTime: number;
  candidates: candidate[];
};

export type candidate = {
  startTime: Date;
  scheduleTime: number; //time*30minute
  members: member[];
};

export type member = {
  id: string;
  name: string;
};
