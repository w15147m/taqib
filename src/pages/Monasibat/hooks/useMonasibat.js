import {useState, useCallback} from 'react';
import {
  getHijriDate,
  toUrduDigits,
  HIJRI_MONTHS_UR,
  SHIA_EVENTS,
  getEventForHijriDate,
} from '../../../utils/eventsData';

const GREGORIAN_MONTHS_UR = [
  'جنوری',
  'فروری',
  'مارچ',
  'اپریل',
  'مئی',
  'جون',
  'جولائی',
  'اگست',
  'ستمبر',
  'اکتوبر',
  'نومبر',
  'دسمبر',
];

export const useMonasibat = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [displayedGregorian, setDisplayedGregorian] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const selectedHijri = getHijriDate(new Date(selectedDate));

  const handleMonthChange = useCallback(gMonth => {
    setDisplayedGregorian({
      year: gMonth.year,
      month: gMonth.month,
    });
  }, []);

  const handleDayPress = useCallback(dateString => {
    setSelectedDate(dateString);
  }, []);

  // Format today's Hijri Date
  const todayHijri = getHijriDate(new Date());
  const todayHijriStr = `${toUrduDigits(todayHijri.day)} ${
    HIJRI_MONTHS_UR[todayHijri.month - 1]
  } ${toUrduDigits(todayHijri.year)}ھ`;

  const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate();
  const daysInMonth = getDaysInMonth(displayedGregorian.year, displayedGregorian.month);

  const startHijri = getHijriDate(
    new Date(displayedGregorian.year, displayedGregorian.month - 1, 1),
  );
  const endHijri = getHijriDate(
    new Date(displayedGregorian.year, displayedGregorian.month, 0),
  );

  const startMonthName = HIJRI_MONTHS_UR[startHijri.month - 1];
  const endMonthName = HIJRI_MONTHS_UR[endHijri.month - 1];

  const headerTitle =
    startHijri.month === endHijri.month
      ? startMonthName
      : `${startMonthName} اور ${endMonthName}`;

  // Filter events of the current displayed Gregorian month that are upcoming
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthlyEventsList = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      displayedGregorian.year,
      displayedGregorian.month - 1,
      day,
    );
    const dateCopy = new Date(date);
    dateCopy.setHours(0, 0, 0, 0);

    // Only show events that are today or in the future
    if (dateCopy >= today) {
      const hijri = getHijriDate(date);
      const event = getEventForHijriDate(hijri.month, hijri.day);
      if (event) {
        const isToday = dateCopy.getTime() === today.getTime();
        const gregDayUr = toUrduDigits(date.getDate());
        const gregMonthUr = GREGORIAN_MONTHS_UR[date.getMonth()];
        const gregorianDateStr = `${gregDayUr} ${gregMonthUr}`;

        const diffTime = dateCopy.getTime() - today.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        let countdownText = '';
        if (isToday) {
          countdownText = 'آج';
        } else if (diffDays === 1) {
          countdownText = 'کل';
        } else {
          countdownText = `${toUrduDigits(diffDays)} دن باقی ہیں`;
        }

        monthlyEventsList.push({
          day: hijri.day,
          month: hijri.month,
          isToday,
          gregorianDateStr,
          countdownText,
          ...event,
        });
      }
    }
  }

  // Sort monthlyEventsList so "Today" is at the top, while keeping others chronological
  monthlyEventsList.sort((a, b) => {
    if (a.isToday) {
      return -1;
    }
    if (b.isToday) {
      return 1;
    }
    return 0;
  });

  return {
    selectedDate,
    selectedHijri,
    headerTitle,
    todayHijriStr,
    handleMonthChange,
    handleDayPress,
    monthlyEventsList,
  };
};

export default useMonasibat;
