import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  SparklesIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  CalendarIcon as CalendarIconSolid,
  SparklesIcon as SparklesIconSolid,
} from 'react-native-heroicons/solid';

// Custom Components & Pages
import CustomTabBar from './CustomTabBar';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile/Profile';
import Monasibat from '../../pages/Monasibat/Monasibat';
import Tasbih from '../../pages/Tasbih/Tasbih';

const Tab = createBottomTabNavigator();

// Static tab icons to avoid react/no-unstable-nested-components warnings
const HomeIconOutline = props => <HomeIcon {...props} />;
const HomeIconSolidComp = props => <HomeIconSolid {...props} />;
const CalendarIconOutline = props => <CalendarIcon {...props} />;
const CalendarIconSolidComp = props => <CalendarIconSolid {...props} />;
const SparklesIconOutline = props => <SparklesIcon {...props} />;
const SparklesIconSolidComp = props => <SparklesIconSolid {...props} />;
const UserIconOutline = props => <UserIcon {...props} />;
const UserIconSolidComp = props => <UserIconSolid {...props} />;

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
        name="Monasibat"
        component={Monasibat}
        options={{
          title: 'مناسبت',
          tabBarIcon: CalendarIconOutline,
          tabBarIconActive: CalendarIconSolidComp,
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: UserIconOutline,
          tabBarIconActive: UserIconSolidComp,
          tabBarItemStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
