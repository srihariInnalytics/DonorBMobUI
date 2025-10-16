import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../config/config';

const DropdownComponent = ({ data, setSelectdp, label, value, Selectdp, disabled, heading }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState(Selectdp);

  useEffect(() => {
    if (Selectdp !== selectedValue) {
      setSelectedValue(Selectdp); // Only update state if value actually changes
    }
  }, [Selectdp]); // Dependency array ensures it runs only when Selectdp changes

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.data, borderWidth: 2 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        disabled={disabled} // Corrected prop name
        search
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={heading}
        searchPlaceholder="Search..."
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          if (selectedValue !== item.value) { // Prevent redundant updates
            setSelectedValue(item.value);
            setSelectdp(item.value);
          }
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? colors.data : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 3,
  },
  dropdown: {
    height: 50,
    borderColor: colors.data,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },
});
