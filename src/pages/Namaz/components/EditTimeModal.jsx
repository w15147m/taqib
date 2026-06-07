import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import BaseModal from '../../../common/components/BaseModal';
import ScrollPicker from './ScrollPicker';

const HOURS_LIST = Array.from({length: 12}, (_, i) => String(i + 1));
const MINUTES_LIST = Array.from({length: 60}, (_, i) =>
  String(i).padStart(2, '0'),
);

const EditTimeModal = ({
  visible,
  onClose,
  prayer,
  onSave,
  onReset,
  isDarkMode,
}) => {
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');

  useEffect(() => {
    if (prayer && prayer.time) {
      const [hours, minutes] = prayer.time.split(':');
      // Strip leading zero for hours (e.g. "03" -> "3") to match our HOURS_LIST
      const cleanedHour = String(parseInt(hours, 10));
      setSelectedHour(cleanedHour);
      setSelectedMinute(minutes);
    }
  }, [prayer]);

  const handleSave = () => {
    onSave(selectedHour, selectedMinute);
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title={`${prayer ? prayer.nameUr : ''} کا وقت تبدیل کریں`}
      maxWidth={400}
      footer={
        <View className="flex-row justify-between items-center gap-3">
          <TouchableOpacity
            onPress={onReset}
            activeOpacity={0.7}
            className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl flex-1 items-center justify-center">
            <Text className="text-xs font-bold text-slate-600 dark:text-slate-300">
              اصل وقت
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.7}
            className="bg-indigo-600 dark:bg-indigo-700 px-4 py-3 rounded-2xl flex-1 items-center justify-center">
            <Text className="text-xs font-bold text-white">محفوظ کریں</Text>
          </TouchableOpacity>
        </View>
      }>
      <View className="items-center">
        <Text className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 leading-6">
          گھنٹہ اور منٹ اسکرول کر کے نماز کا اپنی پسند کا وقت منتخب کریں۔
        </Text>

        {/* Scrollable Wheels Container */}
        <View className="flex-row items-center justify-center gap-6 mb-4">
          {/* Hour Scroll Picker */}
          <View className="items-center">
            <Text className="text-xs text-slate-400 dark:text-slate-500 mb-2 font-bold">
              گھنٹہ
            </Text>
            <ScrollPicker
              items={HOURS_LIST}
              value={selectedHour}
              onChange={setSelectedHour}
              isDarkMode={isDarkMode}
            />
          </View>

          <Text className="text-2xl font-bold text-slate-400 dark:text-slate-500 mt-6">
            :
          </Text>

          {/* Minute Scroll Picker */}
          <View className="items-center">
            <Text className="text-xs text-slate-400 dark:text-slate-500 mb-2 font-bold">
              منٹ
            </Text>
            <ScrollPicker
              items={MINUTES_LIST}
              value={selectedMinute}
              onChange={setSelectedMinute}
              isDarkMode={isDarkMode}
            />
          </View>
        </View>
      </View>
    </BaseModal>
  );
};

export default EditTimeModal;
