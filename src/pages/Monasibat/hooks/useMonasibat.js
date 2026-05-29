import {useState, useCallback} from 'react';
import {
  getHijriDate,
  toUrduDigits,
  HIJRI_MONTHS_UR,
  SHIA_EVENTS,
} from '../../../utils/eventsData';

export const useMonasibat = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [displayedHijriMonth, setDisplayedHijriMonth] = useState(
    getHijriDate(new Date()).month,
  );

  const selectedHijri = getHijriDate(new Date(selectedDate));

  const handleMonthChange = useCallback(gMonth => {
    const midDate = new Date(gMonth.year, gMonth.month - 1, 15);
    const hijri = getHijriDate(midDate);
    setDisplayedHijriMonth(hijri.month);
  }, []);

  const handleDayPress = useCallback(dateString => {
    setSelectedDate(dateString);
  }, []);

  // Format today's Hijri Date
  const todayHijri = getHijriDate(new Date());
  const todayHijriStr = `${toUrduDigits(todayHijri.day)} ${
    HIJRI_MONTHS_UR[todayHijri.month - 1]
  } ${toUrduDigits(todayHijri.year)}ھ`;

  // Filter events of the current displayed Hijri month
  const monthlyEventsList = Object.keys(SHIA_EVENTS)
    .filter(key => key.startsWith(`${displayedHijriMonth}_`))
    .map(key => {
      const dayNum = parseInt(key.split('_')[1], 10);
      const isToday =
        displayedHijriMonth === todayHijri.month && dayNum === todayHijri.day;
      return {
        day: dayNum,
        isToday,
        ...SHIA_EVENTS[key],
      };
    })
    .sort((a, b) => {
      if (a.isToday) {
        return -1;
      }
      if (b.isToday) {
        return 1;
      }
      return a.day - b.day;
    });

  return {
    selectedDate,
    selectedHijri,
    displayedHijriMonth,
    todayHijriStr,
    handleMonthChange,
    handleDayPress,
    monthlyEventsList,
  };
};
export default useMonasibat;
