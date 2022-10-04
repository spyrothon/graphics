export function makeDate(original: string | Date) {
  if (typeof original === "string") {
    return new Date(original);
  }
  return original;
}

export function humanizedDateTime(datetime: string | Date) {
  const date = makeDate(datetime);
  return date.toLocaleString();
}
