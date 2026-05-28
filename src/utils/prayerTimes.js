import {Coordinates, CalculationParameters, PrayerTimes} from 'adhan';

/**
 * Calculates prayer times for a given coordinate and date.
 * Uses the Shia Jafari (Tehran) calculation method.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {Date} [date]
 * @returns {Object|null} Formatted time strings for fajr, dhuhr, asr, maghrib, isha
 */
export const calculatePrayerTimes = (
  latitude,
  longitude,
  date = new Date(),
) => {
  try {
    const coordinates = new Coordinates(latitude, longitude);
    // Shia Jafari (Leva Research Institute, Qum): Fajr 16°, Isha 14°, Maghrib 4°
    const params = new CalculationParameters('Other', 16, 14, 0, 4);
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    const formatTime = timeDate => {
      if (!timeDate) {
        return '--:--';
      }
      let hours = timeDate.getHours();
      const minutes = timeDate.getMinutes().toString().padStart(2, '0');
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes}`;
    };

    return {
      fajr: formatTime(prayerTimes.fajr),
      dhuhr: formatTime(prayerTimes.dhuhr),
      asr: formatTime(prayerTimes.asr),
      maghrib: formatTime(prayerTimes.maghrib),
      isha: formatTime(prayerTimes.isha),
    };
  } catch (error) {
    console.error('Error calculating prayer times:', error);
    return null;
  }
};

/**
 * Calculates the next upcoming prayer time for a given coordinate and date.
 * Uses the Shia Jafari (Tehran) calculation method.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {Date} [date]
 * @returns {Object|null} Object containing name (English), nameUr (Urdu), and time (formatted string)
 */
export const getNextPrayer = (latitude, longitude, date = new Date()) => {
  try {
    const coordinates = new Coordinates(latitude, longitude);
    // Shia Jafari (Leva Research Institute, Qum): Fajr 16°, Isha 14°, Maghrib 4°
    const params = new CalculationParameters('Other', 16, 14, 0, 4);

    // Calculate for today
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    const prayers = [
      {name: 'Fajr', nameUr: 'فجر', time: prayerTimes.fajr},
      {name: 'Dhuhr', nameUr: 'ظہر', time: prayerTimes.dhuhr},
      {name: 'Asr', nameUr: 'عصر', time: prayerTimes.asr},
      {name: 'Maghrib', nameUr: 'مغرب', time: prayerTimes.maghrib},
      {name: 'Isha', nameUr: 'عشاء', time: prayerTimes.isha},
    ];

    const now = new Date();

    // Find the first prayer whose time is after 'now'
    let next = prayers.find(p => p.time > now);

    const formatTime = timeDate => {
      if (!timeDate) {
        return '--:--';
      }
      let hours = timeDate.getHours();
      const minutes = timeDate.getMinutes().toString().padStart(2, '0');
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes}`;
    };

    if (!next) {
      // If all prayers of today have passed, the next prayer is tomorrow's Fajr
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowTimes = new PrayerTimes(coordinates, tomorrow, params);
      return {
        name: 'Fajr',
        nameUr: 'فجر',
        time: formatTime(tomorrowTimes.fajr),
      };
    }

    return {
      name: next.name,
      nameUr: next.nameUr,
      time: formatTime(next.time),
    };
  } catch (error) {
    console.error('Error calculating next prayer:', error);
    return null;
  }
};
