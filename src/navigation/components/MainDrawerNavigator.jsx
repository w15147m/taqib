import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileDrawer from './ProfileDrawer';
import EditProfile from '../../pages/Profile/components/EditProfile';
import Content from '../../pages/Content';
import About from '../../pages/About';
import Disclaimer from '../../pages/Disclaimer';
import Settings from '../../pages/Settings/Settings';
import TestPage from '../../pages/TestPage';
import Monasibat from '../../pages/Monasibat/Monasibat';

const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  return <ProfileDrawer {...props} />;
};

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right', // Drawer opens from the right side
        drawerType: 'front',
        drawerStyle: {
          width: '85%',
        },
        swipeEnabled: false, // Disable swipe to prevent accidental openings on Home/Stats
      }}>
      <Drawer.Screen name="TabsRoot" component={TabNavigator} />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Content"
        component={Content}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Disclaimer"
        component={Disclaimer}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="TestPage"
        component={TestPage}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Monasibat"
        component={Monasibat}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
