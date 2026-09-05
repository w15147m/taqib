import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  CalendarIcon,
  SparklesIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  CalendarIcon as CalendarIconSolid,
  SparklesIcon as SparklesIconSolid,
} from 'react-native-heroicons/solid';
import Svg, {Circle, Path} from 'react-native-svg';

// Custom Components & Pages
import CustomTabBar from './CustomTabBar';
import Home from '../../pages/Home/Home';
import Monasibat from '../../pages/Monasibat/Monasibat';
import Tasbih from '../../pages/Tasbih/Tasbih';
import Qibla from '../../pages/Qibla/Qibla';

const Tab = createBottomTabNavigator();

// Static tab icons to avoid react/no-unstable-nested-components warnings
const HomeIconOutline = props => <HomeIcon {...props} />;
const HomeIconSolidComp = props => <HomeIconSolid {...props} />;
const CalendarIconOutline = props => <CalendarIcon {...props} />;
const CalendarIconSolidComp = props => <CalendarIconSolid {...props} />;
const SparklesIconOutline = props => <SparklesIcon {...props} />;
const SparklesIconSolidComp = props => <SparklesIconSolid {...props} />;

const CompassIconOutline = ({color, size = 24}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M16.2 7.8l-2 6.4-6.4 2 2-6.4 6.4-2z" />
  </Svg>
);

const CompassIconSolidComp = ({color, size = 24}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M16.2 7.8l-2 6.4-6.4 2 2-6.4 6.4-2z" fill={color} />
  </Svg>
);

const TabBarComponent = props => <CustomTabBar {...props} />;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={TabBarComponent}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'ہوم',
          tabBarIcon: HomeIconOutline,
          tabBarIconActive: HomeIconSolidComp,
        }}
      />

      <Tab.Screen
        name="Tasbih"
        component={Tasbih}
        options={{
          title: 'تسبیح',
          tabBarIcon: SparklesIconOutline,
          tabBarIconActive: SparklesIconSolidComp,
        }}
      />

      <Tab.Screen
        name="Qibla"
        component={Qibla}
        options={{
          title: 'قبلہ',
          tabBarIcon: CompassIconOutline,
          tabBarIconActive: CompassIconSolidComp,
        }}
      />

      <Tab.Screen
        name="Monasibat"
        component={Monasibat}
        options={{
          title: 'مناسبات',
          tabBarIcon: CalendarIconOutline,
          tabBarIconActive: CalendarIconSolidComp,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
