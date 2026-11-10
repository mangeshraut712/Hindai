/**
 * Format a date in en-IN. Invalid values return an empty string
 * instead of throwing RangeError: Invalid time value.
 */
const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return DATE_FORMAT.format(date);
}
