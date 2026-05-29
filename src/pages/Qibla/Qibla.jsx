import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
  StyleSheet,
} from 'react-native';
import Svg, {Circle, Polygon, Rect, Line, Text as SvgText} from 'react-native-svg';
import {ArrowPathIcon, CompassIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';
import Header from '../../common/components/Header';
import {toUrduDigits} from '../../utils/eventsData';
import useQibla from './hooks/useQibla';

const toRadians = deg => (deg * Math.PI) / 180;

const calculateDistance = (lat1, lon1) => {
  const R = 6371; // Radius of the earth in km
  const lat2 = 21.422487;
  const lon2 = 39.826206;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d);
};

const getUrduDirection = deg => {
  const d = (deg + 360) % 360;
  if (d >= 337.5 || d < 22.5) return 'شمال (N)';
  if (d >= 22.5 && d < 67.5) return 'شمال مشرق (NE)';
  if (d >= 67.5 && d < 112.5) return 'مشرق (E)';
  if (d >= 112.5 && d < 157.5) return 'جنوب مشرق (SE)';
  if (d >= 157.5 && d < 202.5) return 'جنوب (S)';
  if (d >= 202.5 && d < 247.5) return 'جنوب مغرب (SW)';
  if (d >= 247.5 && d < 292.5) return 'مغرب (W)';
  return 'شمال مغرب (NW)';
};

const Qibla = () => {
  const {isDarkMode} = useTheme();
  const {
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
  } = useQibla();

  const hasVibratedRef = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    if (isAligned) {
      if (!hasVibratedRef.current) {
        Vibration.vibrate(80);
        hasVibratedRef.current = true;
      }
    } else {
      hasVibratedRef.current = false;
    }
  }, [isAligned]);

  const renderContent = () => {
    if (locationLoading) {
      return (
        <View className="flex-1 justify-center items-center p-6">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-slate-500 dark:text-slate-400 mt-4 text-base font-semibold text-center font-quran-header">
            جی پی ایس لوکیشن حاصل کی جا رہی ہے...
          </Text>
        </View>
      );
    }

    if (locationError) {
      return (
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-rose-500 font-bold text-lg text-center mb-2 font-quran-header">
            جی پی ایس لوکیشن کا مسئلہ
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-center mb-6 font-semibold">
            {locationError === 'Location permission denied.'
              ? 'قبلہ کی سمت جاننے کے لیے لوکیشن کی اجازت درکار ہے۔'
              : 'لوکیشن حاصل کرنے میں ناکامی۔ براہ کرم چیک کریں کہ جی پی ایس آن ہے۔'}
          </Text>
          <TouchableOpacity
            onPress={getLocation}
            className="flex-row items-center bg-indigo-600 dark:bg-indigo-500 px-6 py-3 rounded-2xl shadow-sm">
            <ArrowPathIcon size={18} color="white" className="mr-2" />
            <Text className="text-white font-bold text-base font-quran-header">
              دوبارہ کوشش کریں
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    const distance =
      location && location.latitude && location.longitude
        ? calculateDistance(location.latitude, location.longitude)
        : null;

    return (
      <View className="flex-1 items-center justify-between px-6 pt-2 pb-24">
        {/* Distance Card */}
        {distance !== null && (
          <View className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 items-center shadow-sm">
            <Text className="text-slate-400 dark:text-slate-500 text-xxs font-bold mb-0.5">
              مکہ مکرمہ (کعبہ) سے دوری
            </Text>
            <Text className="text-xl font-bold text-slate-800 dark:text-slate-100 font-quran-header">
              {toUrduDigits(distance.toLocaleString())} کلومیٹر
            </Text>
          </View>
        )}

        {/* Compass Body */}
        <View className="items-center justify-center my-2">
          <View
            style={styles.compassContainer}
            onStartShouldSetResponder={() => compassError !== null}
            onMoveShouldSetResponder={() => compassError !== null}
            onResponderGrant={evt => {
              lastX.current = evt.nativeEvent.pageX;
            }}
            onResponderMove={evt => {
              const currentX = evt.nativeEvent.pageX;
              const deltaX = currentX - lastX.current;
              lastX.current = currentX;
              // Drag right spins dial clockwise, meaning heading decreases.
              setHeading(prev => (prev - deltaX * 0.5 + 360) % 360);
            }}>
            {/* Layer 1: Rotating Dial (Heading) */}
            <View
              style={[
                styles.dialView,
                {transform: [{rotate: `${dialRotation}deg`}]},
              ]}>
              <Svg width="260" height="260" viewBox="0 0 260 260">
                {/* Background circle */}
                <Circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill={isDarkMode ? '#0f172a' : '#f8fafc'}
                  stroke={isDarkMode ? '#334155' : '#e2e8f0'}
                  strokeWidth="1.5"
                />
                {/* Cardinal text */}
                <SvgText
                  x="130"
                  y="36"
                  fontSize="22"
                  fontWeight="bold"
                  fill="#ef4444"
                  textAnchor="middle">
                  N
                </SvgText>
                <SvgText
                  x="225"
                  y="137"
                  fontSize="20"
                  fontWeight="bold"
                  fill={isDarkMode ? '#94a3b8' : '#475569'}
                  textAnchor="middle">
                  E
                </SvgText>
                <SvgText
                  x="130"
                  y="242"
                  fontSize="20"
                  fontWeight="bold"
                  fill={isDarkMode ? '#64748b' : '#64748b'}
                  textAnchor="middle">
                  S
                </SvgText>
                <SvgText
                  x="35"
                  y="137"
                  fontSize="20"
                  fontWeight="bold"
                  fill={isDarkMode ? '#94a3b8' : '#475569'}
                  textAnchor="middle">
                  W
                </SvgText>

                {/* Ticks */}
                {Array.from({length: 12}).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 130 + 110 * Math.cos(angle);
                  const y1 = 130 + 110 * Math.sin(angle);
                  const x2 = 130 + 118 * Math.cos(angle);
                  const y2 = 130 + 118 * Math.sin(angle);
                  if (i % 3 === 0) return null;
                  return (
                    <Line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isDarkMode ? '#334155' : '#cbd5e1'}
                      strokeWidth="2"
                    />
                  );
                })}
              </Svg>
            </View>

            {/* Layer 2: Rotating Needle (Qibla Direction) */}
            <View
              style={[
                styles.needleView,
                {transform: [{rotate: `${needleRotation}deg`}]},
              ]}>
              <Svg width="260" height="260" viewBox="0 0 260 260">
                {/* Needle upper pointing to Mecca (Emerald Green/Gold) */}
                <Polygon
                  points="130,22 142,130 130,120"
                  fill={isAligned ? '#10b981' : '#6366f1'}
                />
                <Polygon
                  points="130,22 118,130 130,120"
                  fill={isAligned ? '#059669' : '#4f46e5'}
                />

                {/* Needle lower (opposite direction) (Slate/Gray) */}
                <Polygon
                  points="130,238 142,130 130,140"
                  fill={isDarkMode ? '#334155' : '#e2e8f0'}
                />
                <Polygon
                  points="130,238 118,130 130,140"
                  fill={isDarkMode ? '#475569' : '#cbd5e1'}
                />

                {/* Center cap / Pin */}
                <Circle
                  cx="130"
                  cy="130"
                  r="10"
                  fill={isAligned ? '#10b981' : '#f59e0b'}
                  stroke="white"
                  strokeWidth="2"
                />
                <Circle cx="130" cy="130" r="4" fill="white" />

                {/* Kaaba marker box at the tip */}
                <Rect
                  x="122"
                  y="38"
                  width="16"
                  height="14"
                  rx="2"
                  fill="#1e293b"
                  stroke="#fbbf24"
                  strokeWidth="1"
                />
                {/* Gold band */}
                <Line x1="122" y1="43" x2="138" y2="43" stroke="#fbbf24" strokeWidth="2.5" />
              </Svg>
            </View>

            {/* Layer 3: Fixed compass reference (fixed pointer/arrow pointing straight up) */}
            <View style={styles.fixedPointerView} pointerEvents="none">
              <Svg width="260" height="260" viewBox="0 0 260 260">
                <Polygon points="130,3 135,16 125,16" fill="#f43f5e" />
                <Circle
                  cx="130"
                  cy="130"
                  r="122"
                  fill="none"
                  stroke={isAligned ? '#10b981' : isDarkMode ? '#334155' : '#cbd5e1'}
                  strokeWidth="3"
                />

                {isAligned && (
                  <Circle
                    cx="130"
                    cy="130"
                    r="126"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                )}
              </Svg>
            </View>
          </View>

          {/* Compass Alignment Message */}
          {compassError ? (
            <View className="mt-4 px-6 py-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 rounded-2xl items-center justify-center">
              <Text className="text-amber-700 dark:text-amber-400 text-xs font-bold text-center font-quran-header mb-0.5">
                فون میں کمپاس سینسر (Magnetometer) دستیاب نہیں ہے۔
              </Text>
              <Text className="text-slate-500 dark:text-slate-400 text-xxs text-center font-semibold font-quran-header leading-4">
                دستی رہنمائی: انگلی کی مدد سے کمپاس کو گھمائیں اور شمال (N) کو اصل سمت کے مطابق سیٹ کریں۔
              </Text>
            </View>
          ) : isAligned ? (
            <View className="mt-4 bg-emerald-50 dark:bg-emerald-950/20 px-6 py-2 rounded-full border border-emerald-500/20 items-center justify-center">
              <Text className="text-emerald-600 dark:text-emerald-400 font-bold text-sm font-quran-header">
                قبلہ کی سمت درست ہے!
              </Text>
            </View>
          ) : (
            <View className="mt-4 px-6 py-2 items-center justify-center">
              <Text className="text-slate-400 dark:text-slate-500 text-xs font-semibold font-quran-header">
                کعبہ کی سمت کے لیے سوئی کو سرخ تیر سے ملائیں
              </Text>
            </View>
          )}
        </View>

        {/* Technical details & calibration note */}
        <View className="w-full space-y-3">
          {compassError && (
            <View className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 items-center shadow-sm">
              <Text className="text-slate-400 dark:text-slate-500 text-xs font-bold mb-2">
                کمپاس گھمانے کی ایڈجسٹمنٹ (دستی)
              </Text>
              <View className="flex-row justify-around w-full">
                <TouchableOpacity
                  onPress={() => setHeading(prev => (prev - 10 + 360) % 360)}
                  className="bg-indigo-50 dark:bg-slate-800 px-4 py-2 rounded-2xl">
                  <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-xs font-quran-header">
                    ◀ ۱۰° کھبے (L)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setHeading(prev => (prev + 10) % 360)}
                  className="bg-indigo-50 dark:bg-slate-800 px-4 py-2 rounded-2xl">
                  <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-xs font-quran-header">
                    ۱۰° سجے (R) ▶
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 flex-row justify-around shadow-sm">
            <View className="items-center">
              <Text className="text-slate-400 dark:text-slate-500 text-xxs font-bold uppercase tracking-wider mb-0.5">
                موبائل کا رخ
              </Text>
              <Text className="text-sm font-bold text-slate-800 dark:text-slate-100 font-quran-header">
                {toUrduDigits(Math.round(heading))}° {getUrduDirection(heading)}
              </Text>
            </View>
            <View className="w-[1px] h-full bg-slate-100 dark:bg-slate-800" />
            <View className="items-center">
              <Text className="text-slate-400 dark:text-slate-500 text-xxs font-bold uppercase tracking-wider mb-0.5">
                قبلہ کا زاویہ
              </Text>
              <Text className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-quran-header">
                {toUrduDigits(Math.round(qiblaBearing))}°
              </Text>
            </View>
          </View>

          <Text className="text-slate-400 dark:text-slate-600 text-xxs text-center px-4 font-quran-header">
            {compassError
              ? 'اپنے مقام کے مطابق سورج یا نقشے کی مدد سے کمپاس کو سیدھا کریں۔'
              : 'بہترین نتائج کے لیے فون کو بالکل ہموار سطح پر رکھیں اور اسے دھاتی یا مقناطیسی اشیاء سے دور رکھیں۔'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="قبلہ نما" />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  compassContainer: {
    width: 260,
    height: 260,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialView: {
    width: 260,
    height: 260,
    position: 'absolute',
  },
  needleView: {
    width: 260,
    height: 260,
    position: 'absolute',
  },
  fixedPointerView: {
    width: 260,
    height: 260,
    position: 'absolute',
  },
});

export default Qibla;
