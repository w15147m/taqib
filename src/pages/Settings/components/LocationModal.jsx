import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import BaseModal from '../../../common/components/BaseModal';
import {useTheme} from '../../../context/ThemeContext';

const LocationModal = ({
  visible,
  onClose,
  onSelectGPS,
  onSelectCity,
  loading,
}) => {
  const {isDarkMode} = useTheme();
  const [cityName, setCityName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);

  useEffect(() => {
    if (!cityName || cityName.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setFetchingSuggestions(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=15`,
          {
            headers: {
              'Accept-Language': 'en',
              'User-Agent': 'TaqeebatApp/1.0',
            },
          },
        );
        const data = await response.json();
        if (data) {
          const query = cityName.trim().toLowerCase();
          const formatted = data
            .map(item => {
              return {
                name: item.name || cityName,
                fullName: item.display_name,
                lat: item.lat,
                lon: item.lon,
              };
            })
            .filter(item => item.name.toLowerCase().startsWith(query));
          setSuggestions(formatted);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      } finally {
        setFetchingSuggestions(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [cityName]);

  const handleCitySubmit = () => {
    onSelectCity(cityName);
    setCityName('');
    setSuggestions([]);
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="لوکیشن سیٹنگز">
      <View className="space-y-6">
        {/* Option 1: GPS Location */}
        <TouchableOpacity
          onPress={onSelectGPS}
          disabled={loading}
          activeOpacity={0.7}
          className="w-full flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/60 min-h-[76px]">
          <View className="justify-center min-w-[20px]">
            {loading && <ActivityIndicator size="small" color={isDarkMode ? '#34d399' : '#059669'} />}
          </View>
          <View className="flex-1 items-end pr-4">
            <Text className="text-base font-bold text-slate-800 dark:text-slate-100">
              موجودہ لوکیشن (GPS)
            </Text>
            <Text className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              اپنے فون کی جی پی ایس لوکیشن استعمال کریں
            </Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center justify-center my-2">
          <View className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800" />
          <Text className="mx-4 text-xs font-bold text-slate-400 dark:text-slate-500">
            یا
          </Text>
          <View className="flex-1 h-[1px] bg-slate-100 dark:bg-slate-800" />
        </View>

        {/* Option 2: Manual City Entry */}
        <View style={{zIndex: 50, position: 'relative'}} className="space-y-3">
          <Text className="text-slate-500 dark:text-slate-400 font-bold text-sm text-right pr-1">
            شہر کا نام درج کریں
          </Text>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={handleCitySubmit}
              disabled={loading || !cityName.trim()}
              activeOpacity={0.7}
              className={`px-4 py-3.5 rounded-xl justify-center items-center ${
                cityName.trim() ? 'bg-indigo-600' : 'bg-indigo-300'
              }`}>
              <Text className="text-white font-bold text-sm">محفوظ کریں</Text>
            </TouchableOpacity>
            <TextInput
              value={cityName}
              onChangeText={setCityName}
              placeholder="شہر کا نام درج کریں (مثلاً کراچی)"
              placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 text-right font-semibold"
            />
          </View>

          {/* Auto Suggestions List & Loader positioned absolutely to prevent UI shifting */}
          {fetchingSuggestions && (
            <View className="absolute top-[82px] left-0 right-0 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl items-center z-50 shadow-lg">
              <ActivityIndicator size="small" color={isDarkMode ? '#818cf8' : '#4f46e5'} />
            </View>
          )}

          {suggestions.length > 0 && !fetchingSuggestions && (
            <View className="absolute top-[82px] left-0 right-0 bg-white dark:bg-slate-900 border border-slate-100/70 dark:border-slate-800 rounded-2xl divide-y divide-slate-100/50 dark:divide-slate-800/50 z-50 max-h-[180px] shadow-lg overflow-hidden">
              <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {suggestions.map((item, idx) => (
                  <TouchableOpacity
                    key={`suggestion-${idx}`}
                    onPress={() => {
                      onSelectCity(item.name, parseFloat(item.lat), parseFloat(item.lon));
                      setCityName('');
                      setSuggestions([]);
                    }}
                    activeOpacity={0.7}
                    className="px-6 py-4 flex-row justify-between items-center bg-white dark:bg-slate-900">
                    <Text className="text-[10px] text-slate-400 dark:text-slate-500 text-left mr-4 flex-1" numberOfLines={1}>
                      {item.fullName}
                    </Text>
                    <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-right">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </BaseModal>
  );
};

export default LocationModal;
