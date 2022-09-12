/**
 * Returns an ISO-8601 formatted (YYYY-MM-DDTHH:MM:SSZ) string representing the
 * given Date. Always in UTC.
 */
export function dateToString(date: Date) {
  return date.toISOString();
}

/**
 * Returns a native Date object created by parsing the given ISO-8601 date string.
 */
export function isoStringToDate(str: string) {
  return new Date(Date.parse(str));
}
