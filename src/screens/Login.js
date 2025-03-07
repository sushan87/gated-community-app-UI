import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

const Login = () => {
  const [unitNumber, setUnitNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    const unitRegex = /^\d{2}[A-Za-z]{2}$/; // Two numbers + two letters (e.g., 12AB)

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
      Alert.alert(
        'Validation Error',
        'Unit number must be in the format: two digits followed by two letters (e.g., 12AB).',
      );
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!validateInputs()) return;

    const loginData = {
      unitNumber,
      phoneNumber,
      password,
    };

    console.log('Login Data:', JSON.stringify(loginData, null, 2));
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
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
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
