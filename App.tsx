import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Bulletin from './src/screens/Bulletin';

const App = () => {
  return <Bulletin />;
};

export default App;
