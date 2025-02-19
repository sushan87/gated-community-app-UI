import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Register from './src/screens/Register'
import Login from './src/screens/Login';


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Register />
    </View>
  );
};

export default App;