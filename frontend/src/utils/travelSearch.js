import { getSavedLanguageCode } from "../i18n/siteLanguage";

const languageLocales = {
  eng: "en",
  fra: "fr",
  ara: "ar",
};

const weekdayLabelsByLanguage = {
  eng: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  fra: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
  ara: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
};

function getCurrentLanguageCode() {
  return typeof window === "undefined" ? "eng" : getSavedLanguageCode();
}

export function getCurrentTravelLocale() {
  return languageLocales[getCurrentLanguageCode()] || languageLocales.eng;
}

export function getWeekdayLabels() {
  return weekdayLabelsByLanguage[getCurrentLanguageCode()] || weekdayLabelsByLanguage.eng;
}

export function getTodayDate() {
  return toDateValue(new Date());
}

export function parseDateValue(dateValue) {
  if (!dateValue) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }, (_, index) => {
    const dayOffset = index - firstWeekday + 1;
    let date = new Date(year, month, dayOffset);
    let isCurrentMonth = true;

    if (dayOffset < 1) {
      date = new Date(year, month - 1, daysInPreviousMonth + dayOffset);
      isCurrentMonth = false;
    }

    if (dayOffset > daysInMonth) {
      date = new Date(year, month + 1, dayOffset - daysInMonth);
      isCurrentMonth = false;
    }

    return {
      date,
      isCurrentMonth,
      value: toDateValue(date),
    };
  });
}

export function formatTravelDate(dateValue) {
  if (!dateValue) {
    const code = getCurrentLanguageCode();

    if (code === "fra") {
      return "Choisir une date";
    }

    if (code === "ara") {
      return "اختر تاريخا";
    }

    return "Pick a date";
  }

  const parsedDate = parseDateValue(dateValue);

  if (!parsedDate) {
    return dateValue;
  }

  return new Intl.DateTimeFormat(getCurrentTravelLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export function formatMonthTitle(date) {
  return new Intl.DateTimeFormat(getCurrentTravelLocale(), {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatGuestSummary(guestCounts) {
  const code = getCurrentLanguageCode();
  const guests = guestCounts.adults + guestCounts.children + guestCounts.infants;
  const pets = guestCounts.pets;
  const parts = [];

  if (guests > 0) {
    if (code === "fra") {
      parts.push(`${guests} ${guests === 1 ? "invité" : "invités"}`);
    } else if (code === "ara") {
      parts.push(`${guests} ${guests === 1 ? "ضيف" : "ضيوف"}`);
    } else {
      parts.push(`${guests} ${guests === 1 ? "guest" : "guests"}`);
    }
  }

  if (pets > 0) {
    if (code === "fra") {
      parts.push(`${pets} ${pets === 1 ? "animal" : "animaux"}`);
    } else if (code === "ara") {
      parts.push(`${pets} ${pets === 1 ? "حيوان أليف" : "حيوانات أليفة"}`);
    } else {
      parts.push(`${pets} ${pets === 1 ? "pet" : "pets"}`);
    }
  }

  if (parts.length) {
    return parts.join(", ");
  }

  if (code === "fra") {
    return "Ajouter des voyageurs";
  }

  if (code === "ara") {
    return "أضف مسافرين";
  }

  return "Add guests";
}
