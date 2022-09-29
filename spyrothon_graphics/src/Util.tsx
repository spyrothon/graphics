import { DateTime, Duration } from "luxon";

export function timeFromISO(isoString: string) {
  return DateTime.fromISO(isoString, { zone: "utc" });
}

export function diffSeconds(end: DateTime, start: DateTime) {
  return end && start && end.diff(start).as("seconds");
}

export function runTime(seconds: number) {
  if (seconds == null) return null;
  return Duration.fromMillis(seconds * 1000).toFormat("hh:mm:ss");
}

export function runTimeFromStart(startString: string) {
  return DateTime.utc()
    .diff(DateTime.fromISO(startString, { zone: "utc" }))
    .toFormat("hh:mm:ss");
}

export function simpleDate(date: string) {
  return DateTime.fromISO(date).toLocaleString({
    year: "numeric",
    month: "long",
  });
}

export function fullDate(date: string) {
  return DateTime.fromISO(date).toLocaleString({
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function simpleDateTime(date: string) {
  return DateTime.fromISO(date).toLocaleString({
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function simpleDateTimeUTC(date: string) {
  return DateTime.fromISO(date, { zone: "utc" }).toLocaleString({
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function getThumbnailURL(urlTemplate: string, width: number, height: number) {
  return urlTemplate.replace("{width}", `${width}`).replace("{height}", `${height}`);
}
