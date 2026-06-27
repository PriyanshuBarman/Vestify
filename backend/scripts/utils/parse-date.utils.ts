/**
 * Parse DD-MM-YYYY date string to Date object
 **/

export function parseDDMMYYYY(dateStr: string) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
}
