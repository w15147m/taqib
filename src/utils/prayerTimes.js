import {Coordinates, CalculationMethod, PrayerTimes} from 'adhan';

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
    const params = CalculationMethod.Tehran();
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    const formatTime = timeDate => {
      if (!timeDate) {
        return '--:--';
      }
      return timeDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
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
