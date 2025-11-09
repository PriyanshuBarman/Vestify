import { tz, TZDate } from "@date-fns/tz";
import { format, isWeekend } from "date-fns";

const holidays = [
  {
    id: 1,
    date: "2025-02-19",
    day: "Wednesday",
    description: "Chhatrapati Shivaji Maharaj Jayanti",
  },
  {
    id: 2,
    date: "2025-02-26",
    day: "Wednesday",
    description: "Mahashivratri",
  },
  { id: 3, date: "2025-03-14", day: "Friday", description: "Holi" },
  {
    id: 4,
    date: "2025-03-31",
    day: "Monday",
    description: "Id-Ul-Fitr (Ramadan Eid)",
  },
  {
    id: 5,
    date: "2025-04-01",
    day: "Tuesday",
    description: "Annual Bank closing",
  },
  {
    id: 6,
    date: "2025-04-10",
    day: "Thursday",
    description: "Shri Mahavir Jayanti",
  },
  {
    id: 7,
    date: "2025-04-14",
    day: "Monday",
    description: "Dr. Baba Saheb Ambedkar Jayanti",
  },
  {
    id: 8,
    date: "2025-04-18",
    day: "Friday",
    description: "Good Friday",
  },
  {
    id: 9,
    date: "2025-05-01",
    day: "Thursday",
    description: "Maharashtra Day",
  },
  {
    id: 10,
    date: "2025-05-12",
    day: "Monday",
    description: "Buddha Pournima",
  },
  {
    id: 11,
    date: "2025-08-15",
    day: "Friday",
    description: "Independence Day / Parsi New Year",
  },
  {
    id: 12,
    date: "2025-08-27",
    day: "Wednesday",
    description: "Shri Ganesh Chaturthi",
  },
  {
    id: 13,
    date: "2025-09-05",
    day: "Friday",
    description: "Id-E-Milad",
  },
  {
    id: 14,
    date: "2025-10-02",
    day: "Thursday",
    description: "Mahatma Gandhi Jayanti/Dussehra",
  },
  {
    id: 15,
    date: "2025-10-21",
    day: "Tuesday",
    description: "Diwali Laxmi Pujan",
  },
  {
    id: 16,
    date: "2025-10-22",
    day: "Wednesday",
    description: "Balipratipada",
  },
  {
    id: 17,
    date: "2025-11-05",
    day: "Wednesday",
    description: "Prakash Gurpurb Sri Guru Nanak Dev",
  },
  {
    id: 18,
    date: "2025-12-25",
    day: "Thursday",
    description: "Christmas",
  },
];

/**
 * @param {string} dateStr - The date to check (YYYY-MM-DD).
 * @returns {Object|boolean} - The holiday object if found, otherwise false.
 */
function isHoliday(dateStr) {
  return holidays.find((h) => h.date === dateStr) || false;
}

export function isTodayHoliday() {
  const todayStr = format(new Date(), "yyyy-MM-dd", {
    in: tz("Asia/Kolkata"),
  });

  return holidays.find((h) => h.date === todayStr) || false;
}

export function isBusinessDay(date) {
  return !isWeekend(date) && !isHoliday(format(date, "yyyy-MM-dd"));
}

export function getNextBusinessDate(offset = 0, fromDate) {
  let newDate = fromDate || TZDate.tz("Asia/Kolkata");
  let count = 0;

  while (count <= offset) {
    newDate.setDate(newDate.getDate() + 1);
    if (isBusinessDay(newDate)) {
      count++;
    }
  }

  return newDate;
}

export function getPrevBusinessDate(offset = 0, fromDate) {
  let date = fromDate || TZDate.tz("Asia/Kolkata");
  let moved = 0;

  while (moved <= offset) {
    date.setDate(date.getDate() - 1);
    if (!isWeekend(date) && !isHoliday(format(date, "yyyy-MM-dd"))) {
      moved++;
    }
  }

  return date;
}
