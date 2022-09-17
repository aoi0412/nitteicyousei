import {
  previousSunday,
  nextSaturday,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  eachMinuteOfInterval,
  format,
} from "date-fns";
import ja from "date-fns/locale/ja";
export const getWeekList = (date: Date) => {
  const sunday = previousSunday(date);
  const nextsaturday = nextSaturday(sunday);
  const weekList: Date[] = eachDayOfInterval({
    start: sunday,
    end: nextsaturday,
  });

  return weekList;
};

export const getEachMinute = (date: Date) => {
  const startOfDate = startOfDay(date);
  const endOfDate = endOfDay(date);
  const timeList = eachMinuteOfInterval(
    {
      start: startOfDate,
      end: endOfDate,
    },
    { step: 30 }
  );
  return timeList;
};

export const getJaWeekString = (weekList: Date[]) => {
  let jaWeekList: string[] = [];
  weekList.forEach((date) => {
    // console.log("aaa");
    jaWeekList.push(format(date, "EEEEE", { locale: ja }));
  });
  return jaWeekList;
};
