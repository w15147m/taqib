import primaryData from '../db/primaryAccordion.json';

export const HIJRI_MONTHS_UR = primaryData.hijri_months_ur;
export const SHIA_EVENTS = primaryData.shia_events;

export const toUrduDigits = number => {
  const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number
    .toString()
    .split('')
    .map(char => {
      const digit = parseInt(char, 10);
      return isNaN(digit) ? char : urduDigits[digit];
    })
    .join('');
};

export const getHijriDate = (date = new Date(), offset = 0) => {
  try {
    const adjustedDate = new Date(
      date.getTime() + offset * 24 * 60 * 60 * 1000,
    );
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(adjustedDate);
    const day = parseInt(parts.find(p => p.type === 'day').value, 10);
    const month = parseInt(parts.find(p => p.type === 'month').value, 10);
    const year = parseInt(parts.find(p => p.type === 'year').value, 10);
    return {day, month, year};
  } catch (error) {
    console.error('Error calculating Hijri date:', error);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return {day, month, year};
  }
};

export const getEventForHijriDate = (month, day) => {
  return SHIA_EVENTS[`${month}_${day}`] || null;
};

export const getNextUpcomingEvent = (date = new Date(), offset = 0) => {
  const todayHijri = getHijriDate(date, offset);
  let currentMonth = todayHijri.month;
  let currentDay = todayHijri.day;

  const todayEvent = getEventForHijriDate(currentMonth, currentDay);
  if (todayEvent) {
    return {
      ...todayEvent,
      day: currentDay,
      month: currentMonth,
      formattedDateUr: `${toUrduDigits(currentDay)} ${
        HIJRI_MONTHS_UR[currentMonth - 1]
      }`,
      isToday: true,
    };
  }

  for (let mOffset = 0; mOffset < 12; mOffset++) {
    const m = ((currentMonth - 1 + mOffset) % 12) + 1;
    const startDay = mOffset === 0 ? currentDay + 1 : 1;

    const candidates = [];
    for (let d = startDay; d <= 30; d++) {
      const event = getEventForHijriDate(m, d);
      if (event) {
        candidates.push({
          ...event,
          day: d,
          month: m,
          formattedDateUr: `${toUrduDigits(d)} ${HIJRI_MONTHS_UR[m - 1]}`,
          isToday: false,
        });
      }
    }

    if (candidates.length > 0) {
      candidates.sort((a, b) => a.day - b.day);
      return candidates[0];
    }
  }

  return null;
};
