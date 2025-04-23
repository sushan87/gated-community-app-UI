import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Subscription = ({navigation}) => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [vegCount, setVegCount] = useState(0);
  const [nonVegCount, setNonVegCount] = useState(0);

  const plans = {
    basic: 'Basic Subscription (1000 Rs)',
    four: '4 Member (2000 Rs)',
    six: '6 Member (3000 Rs)',
  };

  return (
    <View style={styles.container}>
      {/* Menu icon */}
      <View style={styles.menuIcon}>
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Subscription</Text>

        {/* Plan options */}
        <View style={styles.planList}>
          {Object.entries(plans).map(([key, label]) => (
            <Pressable
              key={key}
              style={[
                styles.option,
                selectedPlan === key && styles.selectedOption,
              ]}
              onPress={() => setSelectedPlan(key)}>
              <View style={styles.radioCircle}>
                {selectedPlan === key && <View style={styles.selectedDot} />}
              </View>
              <Text style={styles.optionText}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Member dropdowns */}
        <View style={styles.dropdownGroup}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Veg Members</Text>
            <Picker
              selectedValue={vegCount}
              onValueChange={itemValue => setVegCount(itemValue)}
              style={styles.picker}>
              {[...Array(7).keys()].map(num => (
                <Picker.Item key={num} label={`${num}`} value={num} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Non-Veg Members</Text>
            <Picker
              selectedValue={nonVegCount}
              onValueChange={itemValue => setNonVegCount(itemValue)}
              style={styles.picker}>
              {[...Array(7).keys()].map(num => (
                <Picker.Item key={num} label={`${num}`} value={num} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Pay Now */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.payText}>Pay Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  menuIcon: {
    marginBottom: 20,
  },
  bar: {
    height: 3,
    backgroundColor: '#333',
    marginVertical: 4,
    width: 28,
    borderRadius: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  planList: {
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderColor: '#DDD',
    backgroundColor: '#F9F9F9',
  },
  selectedOption: {
    borderColor: '#6A5ACD',
    backgroundColor: '#EFEAFF',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6A5ACD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#6A5ACD',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dropdownGroup: {
    marginBottom: 24,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  pickerLabel: {
    fontSize: 16,
    color: '#444',
  },
  picker: {
    height: 50,
    width: 100,
  },
  payButton: {
    backgroundColor: '#4B32E3',
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignSelf: 'center',
    borderRadius: 12,
  },
  payText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
