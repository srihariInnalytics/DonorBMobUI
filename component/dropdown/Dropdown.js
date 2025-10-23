import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
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
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openMenu = () => {
    if (!disabled) {
      Keyboard.dismiss(); // close keyboard if open
      setVisible(true);
    }
  };

  const closeMenu = () => {
    Keyboard.dismiss(); // ✅ close keyboard when menu closes
    setVisible(false);
    setSearchQuery('');
  };


  const handleSelect = (item) => {
    onChange(item[valueExpr]);
    closeMenu();
  };

  const selectedDisplay =
    data.find((d) => d[valueExpr] === value)?.[displayExpr] || '';

  // Filter data based on "searchQuery"
  const filteredData = data.filter((item) =>
    item[displayExpr]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.container}>
        {/* Main TextBox */}
        <TextInput
          label={label}
          value={selectedDisplay}
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
          disabled={disabled}
          showSoftInputOnFocus={false} // prevents keyboard
          onPressIn={openMenu} // open dropdown
          right={
            <TextInput.Icon
              icon={() => (
                <Text style={{ fontSize: 18, color: 'gray' }}>
                  {visible ? 'X' : 'V'}
                </Text>
              )}
              onPress={visible ? closeMenu : openMenu}
            />
          }
        />

        {visible && (
          // Dropdown container
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.dropdownContainer}>
              {/* Search Input (keyboard allowed) */}
              <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                mode="flat"
                style={styles.searchInput}
                theme={{
                  colors: {
                    primary: colors.primary,
                    background: colors.textLight,
                    placeholder: 'gray',
                  },
                }}
                showSoftInputOnFocus={true} // allow keyboard here
              />

              {/* Dropdown List */}
              <ScrollView style={styles.dropdown} keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
                      <Text style={styles.item}>{item[displayExpr]}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noResults}>No results found</Text>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
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
  dropdownContainer: {
    backgroundColor: colors.textLight,
    borderRadius: 6,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
    maxHeight: 200,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: colors.textLight,
  },
  dropdown: {
    flexGrow: 1,
  },
  item: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  noResults: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});
