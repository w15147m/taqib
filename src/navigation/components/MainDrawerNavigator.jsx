import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileDrawer from './ProfileDrawer';
import EditProfile from '../../pages/Profile/components/EditProfile';
import Content from '../../pages/Content';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right', // Drawer opens from the right side
        drawerType: 'front',
        drawerStyle: {
          width: '80%',
        },
        swipeEnabled: false, // Disable swipe to prevent accidental openings on Home/Stats
      }}
    >
      <Drawer.Screen name="TabsRoot" component={TabNavigator} />
      <Drawer.Screen 
        name="EditProfile" 
        component={EditProfile}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen 
        name="Content" 
        component={Content}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
