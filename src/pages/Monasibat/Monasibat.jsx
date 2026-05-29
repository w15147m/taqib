import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useTheme} from '../../context/ThemeContext';
import Header from '../../common/components/Header';
import useMonasibat from './hooks/useMonasibat';
import CustomDay from './components/CustomDay';
import MonthlyEventsList from './components/MonthlyEventsList';

const Monasibat = () => {
  const {isDarkMode} = useTheme();
  const {
    selectedDate,
    displayedHijriMonth,
    handleMonthChange,
    handleDayPress,
    monthlyEventsList,
  } = useMonasibat();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="مناسبت" />

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Calendar Card */}
        <View className="mt-4 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <Calendar
            current={selectedDate}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: isDarkMode ? '#64748b' : '#64748b',
              monthTextColor: isDarkMode ? '#f8fafc' : '#0f172a',
              arrowColor: isDarkMode ? '#34d399' : '#059669',
              textMonthFontWeight: 'bold',
              dayContainerStyle: {
                height: 64,
                justifyContent: 'flex-start',
                padding: 0,
              },
            }}
            onMonthChange={handleMonthChange}
            // eslint-disable-next-line react/no-unstable-nested-components
            dayComponent={({date, state}) => (
              <CustomDay
                date={date}
                state={state}
                isSelected={date.dateString === selectedDate}
                onSelect={handleDayPress}
              />
            )}
          />
        </View>

        {/* Monthly Events List */}
        <MonthlyEventsList
          displayedHijriMonth={displayedHijriMonth}
          monthlyEventsList={monthlyEventsList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Monasibat;
