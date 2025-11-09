/**
 * Parse DD-MM-YYYY date string to Date object
 * @param {string} dateStr - Date string in DD-MM-YYYY format
 * @returns {Date} - Date object
 */

export function parseDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${year}-${month}-${day}`);
}
