import { DateTime } from "luxon";

export function isOldMessage(messageDate: number) {
  const now = DateTime.now();
  const msgTime = DateTime.fromJSDate(new Date(messageDate * 1000));
  return now.diff(msgTime, "minutes").minutes > 1;
}
