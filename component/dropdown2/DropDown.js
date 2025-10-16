import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../config/config';

const DropdownComponent = ({ data, setSelectdp, label, value, Selectdp, disabled, heading }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState(Selectdp); // Use `selectedValue` instead of `value`

  useEffect(() => {
    setSelectedValue(Selectdp); // Update the local state when Selectdp changes
  }, [Selectdp]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.data, borderWidth: 2 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        disable={disabled}
        search
        maxHeight={400}
        labelField={label}  // `label` will be used for the display field
        valueField={value}  // `value` will be used for the actual selected value
        placeholder={heading}
        searchPlaceholder="Search..."
        value={selectedValue} // Use `selectedValue` here
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setSelectedValue(item[value]); // Set the value using the correct field
          setSelectdp(item[value]); // Pass the selected value to the parent
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
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: -9,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
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


// how to import and use
{/* <DropdownComponent
import DropdownComponent from '../../component/dropdown2/DropDown'
  data={SubContractDD} // API response data
  setSelectdp={SubContractChanged} // Function to update the selected value
  Selectdp="" // The selected category value
  isDisable={false}
  heading="Sub Contractor"
  label="Description" // Display field
  value="UID" // Actual value field
/> */}
