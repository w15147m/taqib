import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_STORAGE_KEY = 'location_data';
const LocationContext = createContext();

export const LocationProvider = ({children}) => {
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
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      setError(null);

      const hasPermission = await requestPermission();

      if (!hasPermission) {
        setError('Location permission denied.');
        setLoading(false);
        reject(new Error('Location permission denied.'));
        return;
      }

      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude, accuracy} = position.coords;
          setLocation({latitude, longitude, accuracy});
          try {
            await reverseGeocode(latitude, longitude);
            setLoading(false);
            resolve();
          } catch (e) {
            setLoading(false);
            resolve();
          }
        },
        err => {
          setError(err.message);
          setLoading(false);
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          showLocationDialog: true,
        },
      );
    });
  }, [requestPermission, reverseGeocode]);

  const geocodeCity = useCallback(async (cityName, latitude, longitude) => {
    if (!cityName || cityName.trim() === '') return false;
    setLoading(true);
    setError(null);
    try {
      let finalLat = latitude;
      let finalLon = longitude;
      let finalName = cityName;

      if (finalLat === undefined || finalLon === undefined) {
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
          finalLat = parseFloat(data[0].lat);
          finalLon = parseFloat(data[0].lon);
          finalName = data[0].name || cityName;
        } else {
          setError('City not found.');
          setLoading(false);
          return false;
        }
      }

      const name = finalName
        .replace(/\s+(District|County|Division)$/i, '')
        .trim();

      setLocation({latitude: finalLat, longitude: finalLon});
      setLocationName(name);

      await AsyncStorage.setItem(
        LOCATION_STORAGE_KEY,
        JSON.stringify({
          location: {latitude: finalLat, longitude: finalLon},
          locationName: name,
        }),
      );
      setLoading(false);
      return true;
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
      throw err;
    }
  }, [getLocation]);

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

  return (
    <LocationContext.Provider
      value={{
        location,
        locationName,
        error,
        loading,
        getLocation,
        resetLocation,
        geocodeCity,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
