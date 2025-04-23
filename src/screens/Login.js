import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {UserContext} from '../components/UserContext'; // adjust this path as needed

const Login = ({navigation}) => {
  const [unitNumber, setUnitNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext); // optional: if you're storing logged-in user

  const validateInputs = () => {
    const phoneRegex = /^\d{10}$/;
    const unitRegex = /^\d{2}[A-Za-z]{2}$/;

    if (!unitNumber || !phoneNumber || !password) {
      Alert.alert('Validation Error', 'All fields must be filled.');
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert(
        'Validation Error',
        'Phone number must be exactly 10 digits.',
      );
      return false;
    }

    if (!unitRegex.test(unitNumber)) {
      Alert.alert('Validation Error', 'Unit number must be in format: 12AB');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await fetch(
        'https://98c7-223-185-33-135.ngrok-free.app/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: Number(phoneNumber),
            password: password,
          }),
        },
      );

      const text = await response.text();

      // Attempt to parse as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.log('Non-JSON response from server:', text);
        Alert.alert('Error', 'Invalid response from server.');
        return;
      }

      if (response.ok) {
        // Success
        console.log('Login Success:', data);
        setUser?.(data.user); // optional context update
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Drawer'); // navigate to your home screen
      } else {
        // API returned error
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Unable to login. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your Unit Number (e.g., 32CL)"
          placeholderTextColor="#666"
          value={unitNumber}
          onChangeText={setUnitNumber}
          maxLength={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your Phone Number"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bulletinButton}
          onPress={() => navigation.navigate('Drawer')}>
          <Text style={styles.bulletinText}>📢 Check Bulletin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bulletinButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FF6F61',
    width: '100%',
    alignItems: 'center',
  },
  bulletinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
