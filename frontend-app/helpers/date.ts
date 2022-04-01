// ets = epoch timestamp

export function epochToDate(ets: string): Date {
  return new Date(Number(ets));
}

export function toDateDisplay(date: Date): string {
  return date.toDateString();
}

export function toDateTimeDisplay(date: Date): string {
  return date.toString();
}
