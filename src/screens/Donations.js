import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const donationOptions = [
  {label: 'Idol', value: 'Idol', amount: 35000},
  {label: 'Purohit', value: 'Purohit', amount: 15000},
  {label: 'Dhaki', value: 'Dhaki', amount: 15000},
  {label: 'Miscellaneous', value: 'Misc', amount: 2000},
  {label: 'Flowers', value: 'Flowers', amount: 5000},
  {label: 'Devi Bhog', value: 'Bhog', amount: 10000},
];

const Donations = ({navigation}) => {
  const [selectedDonation, setSelectedDonation] = useState(
    donationOptions[0].value,
  );
  const [amount, setAmount] = useState(donationOptions[0].amount.toString());

  useEffect(() => {
    const selected = donationOptions.find(
      item => item.value === selectedDonation,
    );
    if (selected) setAmount(selected.amount.toString());
  }, [selectedDonation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🙏 Make a Donation</Text>
        <Text style={styles.subtitle}>
          Choose a category and proceed with your donation
        </Text>

        <View style={styles.pickerContainer}>
          <Icon
            name="hand-heart"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <Picker
            selectedValue={selectedDonation}
            style={styles.picker}
            onValueChange={value => setSelectedDonation(value)}>
            {donationOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={`${option.label} (${option.amount} ₹)`}
                value={option.value}
                color="black"
              />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="currency-inr"
            size={24}
            color="#28a745"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your amount"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <TouchableOpacity style={styles.payButton}>
          <Text
            style={styles.payButtonText}
            onPress={() => navigation.navigate('Payment')}>
            💳 Pay Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardButton}>
          <Text style={styles.dashboardButtonText}>
            📊 View Donation Dashboard
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f2f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  payButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  dashboardButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  dashboardButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Donations;
