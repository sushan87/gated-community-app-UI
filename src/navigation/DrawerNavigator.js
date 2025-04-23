import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Bulletin from '../screens/Bulletin';
import Contact from '../screens/Contact';
import Donations from '../screens/Donations';
import Subscription from '../screens/Subscription';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const DrawerNavigator = drawerProps => {
  return (
    <Drawer.Navigator initialRouteName="Bulletin">
      <Drawer.Screen
        options={{headerShown: false}}
        name="Bulletin"
        component={Bulletin}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Subscription"
        component={Subscription}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Donations"
        component={Donations}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Contact"
        component={Contact}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
