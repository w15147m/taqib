import {useState, useEffect} from 'react';
import CompassHeading from 'react-native-compass-heading';
import useLocation from '../../../common/hooks/useLocation';

const toRadians = deg => (deg * Math.PI) / 180;
const toDegrees = rad => (rad * 180) / Math.PI;

export const calculateQibla = (latitude, longitude) => {
  const phi1 = toRadians(latitude);
  const lambda1 = toRadians(longitude);
  // Mecca (Kaaba) coordinates: Lat = 21.422487, Lon = 39.826206
  const phi2 = toRadians(21.422487);
  const lambda2 = toRadians(39.826206);

  const dLon = lambda2 - lambda1;

  const y = Math.sin(dLon);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(dLon);

  const qiblaRad = Math.atan2(y, x);
  const qiblaDeg = toDegrees(qiblaRad);
  return (qiblaDeg + 360) % 360;
};

const useQibla = () => {
  const {location, error: locationError, loading: locationLoading, getLocation} = useLocation();
  const [heading, setHeading] = useState(0);
  const [qiblaBearing, setQiblaBearing] = useState(null);
  const [compassError, setCompassError] = useState(null);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      const bearing = calculateQibla(location.latitude, location.longitude);
      setQiblaBearing(bearing);
    }
  }, [location]);

  useEffect(() => {
    const degreeUpdateRate = 2; // Update every 2 degrees of change

    if (CompassHeading) {
      CompassHeading.start(degreeUpdateRate, ({heading: newHeading}) => {
        setHeading(newHeading);
      })
        .then(started => {
          if (!started) {
            setCompassError('Compass sensor is not available on this device');
          }
        })
        .catch(() => {
          setCompassError('Error starting compass sensor');
        });
    } else {
      setCompassError('Compass module not loaded');
    }

    return () => {
      if (CompassHeading) {
        CompassHeading.stop();
      }
    };
  }, []);

  const needleRotation =
    qiblaBearing !== null ? (qiblaBearing - heading + 360) % 360 : 0;

  const dialRotation = (360 - heading) % 360;

  const diff = Math.abs(qiblaBearing - heading);
  const isAligned = qiblaBearing !== null && (diff < 5 || diff > 355);

  return {
    location,
    locationLoading,
    locationError,
    getLocation,
    heading,
    setHeading,
    qiblaBearing,
    needleRotation,
    dialRotation,
    compassError,
    isAligned,
  };
};

export default useQibla;
