import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Text
} from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'; // install this
import { colors } from '../../component/config/config';

const DateBox = ({ label, value, onChange, disabled = false, missing = false , missingMessage = 'Select this field'}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleOpenPicker = () => {
    if (!disabled) {
      Keyboard.dismiss(); // dismiss keyboard if open
      setShowPicker(true);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios'); // on Android hide picker after selection
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  // Display date in desired format (e.g., DD/MM/YYYY)
  const displayDate = value
    ? `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')
    }/${value.getFullYear()}`
    : '';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <PaperInput
          label={label}
          value={displayDate}
          mode="outlined"
          style={styles.input}
          theme={{
            colors: {
              primary: colors.primary,
              text: 'black',
              placeholder: 'gray',
              background: colors.textLight,
              outline: 'gray',
            },
          }}
          onFocus={handleOpenPicker} // open date picker on focus
          disabled={disabled}
          right={{ icon: 'calendar', onPress: handleOpenPicker }}
        />

        {showPicker && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date(2100, 11, 31)}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}

        {missing && (value == '' || value == 0 || value == 'undefined' || value == null) &&
          < Text style={styles.error}>{missingMessage}</Text>
        }

      </View>
    </TouchableWithoutFeedback>
  );
};

export default DateBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: colors.textLight,
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 14,
    marginLeft: 3
  }
});


// usage :
{/* <DateBox
          label="Birth Date"
          value={''}
          onChange={(date) => console.log(date)}
          missing={Missing}
        /> */}