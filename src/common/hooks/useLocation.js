import {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_STORAGE_KEY = 'location_data';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'TaqeebatApp/1.0',
          },
        },
      );
      const data = await response.json();
      const addr = data.address || {};
      const rawName =
        addr.city ||
        addr.town ||
        addr.county ||
        addr.state ||
        data.display_name ||
        'Unknown Location';
      const name = rawName
        .replace(/\s+(District|County|Division)$/i, '')
        .trim();
      setLocationName(name);

      await AsyncStorage.setItem(
        LOCATION_STORAGE_KEY,
        JSON.stringify({
          location: {latitude, longitude},
          locationName: name,
        }),
      );
    } catch {
      setLocationName(null);
      await AsyncStorage.setItem(
        LOCATION_STORAGE_KEY,
        JSON.stringify({
          location: {latitude, longitude},
          locationName: null,
        }),
      );
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }, []);

  const getLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    const hasPermission = await requestPermission();

    if (!hasPermission) {
      setError('Location permission denied.');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude, accuracy} = position.coords;
        setLocation({latitude, longitude, accuracy});
        reverseGeocode(latitude, longitude);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true,
      },
    );
  }, [requestPermission, reverseGeocode]);

  // Load saved location on mount, or fetch if not available
  useEffect(() => {
    const initLocation = async () => {
      try {
        const stored = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.location) {
            setLocation(parsed.location);
            const cleanName = parsed.locationName
              ? parsed.locationName
                  .replace(/\s+(District|County|Division)$/i, '')
                  .trim()
              : null;
            setLocationName(cleanName);
            return;
          }
        }
        await getLocation();
      } catch (err) {
        console.error('Error reading saved location:', err);
        await getLocation();
      }
    };
    initLocation();
  }, [getLocation]);

  const geocodeCity = useCallback(async (cityName) => {
    if (!cityName || cityName.trim() === '') return false;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'TaqeebatApp/1.0',
          },
        },
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        const matchedName = data[0].name || cityName;
        const name = matchedName
          .replace(/\s+(District|County|Division)$/i, '')
          .trim();

        setLocation({latitude, longitude});
        setLocationName(name);

        await AsyncStorage.setItem(
          LOCATION_STORAGE_KEY,
          JSON.stringify({
            location: {latitude, longitude},
            locationName: name,
          }),
        );
        setLoading(false);
        return true;
      } else {
        setError('City not found.');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError(err.message || 'Geocoding error.');
      setLoading(false);
      return false;
    }
  }, []);

  const resetLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await AsyncStorage.removeItem(LOCATION_STORAGE_KEY);
      setLocation(null);
      setLocationName(null);
      await getLocation();
    } catch (err) {
      setError(err.message || 'Error resetting location');
      setLoading(false);
    }
  }, [getLocation]);

  return {location, locationName, error, loading, getLocation, resetLocation, geocodeCity};
};

export default useLocation;
