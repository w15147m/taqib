import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const reverseGeocode = async (latitude, longitude) => {
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
      const name =
        addr.city ||
        addr.town ||
        addr.county ||
        addr.state ||
        data.display_name ||
        'Unknown Location';
      setLocationName(name);
    } catch {
      setLocationName(null);
    }
  };

  const requestPermission = async () => {
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
  };

  const getLocation = async () => {
    setLoading(true);
    setError(null);
    setLocation(null);

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
      },
    );
  };

  return {location, locationName, error, loading, getLocation};
};

export default useLocation;
