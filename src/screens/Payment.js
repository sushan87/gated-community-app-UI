import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [images, setImages] = useState([]);

  const paymentOptions = ['CASH', 'CHEQUE', 'UPI', 'Others'];

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // set to >1 for multiple
      },
      response => {
        if (!response.didCancel && !response.errorCode) {
          const selectedImages = response.assets || [];
          setImages(prev => [...prev, ...selectedImages]);
        }
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>💳 Payment Page</Text>

        <View style={styles.row}>
          {/* Payment Methods */}
          <View style={styles.leftColumn}>
            <Text style={styles.subHeader}>Select Payment Mode</Text>
            {paymentOptions.map(option => (
              <Pressable
                key={option}
                onPress={() => setPaymentMethod(option)}
                style={({pressed}) => [
                  styles.optionButton,
                  paymentMethod === option && styles.activeOption,
                  pressed && styles.pressedOption,
                ]}>
                <View
                  style={[
                    styles.radioOuter,
                    paymentMethod === option && styles.radioOuterActive,
                  ]}>
                  {paymentMethod === option && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>

          {/* Input Placeholders */}
          <View style={styles.rightColumn}>
            <TouchableOpacity style={styles.inputPlaceholder}>
              <Text style={styles.inputText}>💰 Amount Contributed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputPlaceholder}>
              <Text style={styles.inputText}>📅 Date Contributed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputPlaceholder}>
              <Text style={styles.inputText}>🙋 Money Given To</Text>
            </TouchableOpacity>

            {/* Image Picker */}
            <TouchableOpacity
              onPress={pickImage}
              style={[styles.inputPlaceholder, styles.imagePicker]}>
              <Text style={styles.inputText}>📷 Attach Images</Text>
            </TouchableOpacity>

            {/* Show Selected Images */}
            {images.length > 0 && (
              <View style={styles.imagePreviewContainer}>
                {images.map((img, idx) => (
                  <Image
                    key={idx}
                    source={{uri: img.uri}}
                    style={styles.imagePreview}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>✅ Approve your payment!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F6F7FB',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 6,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  activeOption: {
    borderColor: '#7C3AED',
    backgroundColor: '#EFE9FF',
  },
  pressedOption: {
    backgroundColor: '#E5E7EB',
  },
  optionText: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#333',
    fontSize: 15,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#7C3AED',
  },
  radioInner: {
    width: 10,
    height: 10,
    backgroundColor: '#7C3AED',
    borderRadius: 5,
  },
  inputPlaceholder: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  inputText: {
    fontSize: 15,
    color: '#333',
  },
  imagePicker: {
    borderStyle: 'dashed',
    borderColor: '#aaa',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imagePreview: {
    width: 70,
    height: 70,
    marginTop: 8,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 28,
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 16,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Payment;
