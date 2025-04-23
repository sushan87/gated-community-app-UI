import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import DrawerNavigator from './DrawerNavigator'; // Use DrawerNavigator!
import Bulletin from '../screens/Bulletin';
import Subscription from '../screens/Subscription';
import Payment from '../screens/Payment';
import {useState} from 'react';

const Stack = createStackNavigator();

export default props => {
  const [currentScreen, setCurrentScreen] = useState(null);
  const [prevScreen, setPrevScreen] = useState(null);

  const onNavigationRef = navigation => {
    if (navigation) {
      unsubscribe = navigation.addListener('state', e => {
        setPrevScreen(currentScreen);
        setCurrentScreen(navigation.getCurrentRoute());
      });
    } else if (unsubscribe) {
      unsubscribe();
    }

    props.onNavigationRef(navigation);
  };

  return (
    <NavigationContainer ref={onNavigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={Register}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
