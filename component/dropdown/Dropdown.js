import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../component/config/config';

const TextBoxDropdown = ({
  label,
  data = [],
  value,
  onChange,
  disabled = false,
  displayExpr = 'desc',
  valueExpr = 'UID',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    if (!disabled) setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  const handleSelect = (item) => {
    onChange(item[valueExpr]);
    closeMenu();
  };

  const selectedDisplay = data.find((d) => d[valueExpr] === value)?.[displayExpr] || '';

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        <TextInput
          label={label}
          value={selectedDisplay}
          mode="outlined"
          style={[styles.input, isFocused && { borderColor: colors.data }]}
          theme={{
            colors: {
              primary: colors.data,
              text: 'black',
              placeholder: 'gray',
              background: colors.textLight,
              outline: 'gray',
            },
          }}
          onFocus={() => setIsFocused(true)}   // only for border styling
          onBlur={() => setIsFocused(false)}   // only for border styling
          disabled={disabled}
          onPressIn={openMenu}                 // opens menu when tapping textbox
          right={<TextInput.Icon name="menu-down" onPress={openMenu} />}
        />

        {visible && (
          <ScrollView
            style={styles.dropdown}
            keyboardShouldPersistTaps="handled"
          >
            {data.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
                <Text style={styles.item}>{item[displayExpr]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TextBoxDropdown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 10,
    zIndex: 999,
  },
  input: {
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: colors.textLight,
  },
  dropdown: {
    maxHeight: 150,
    backgroundColor: colors.textLight,
    borderRadius: 6,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  item: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
});
