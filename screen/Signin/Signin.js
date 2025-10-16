import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { PaperProvider } from 'react-native-paper';
import Toast from "react-native-toast-message";
import TextBox from '../../component/TextBox/TextBox';
import Dropdown from '../../component/DropDown/DropDown'; // <-- Import new dropdown
import { colors } from '../../component/config/config';

const LoginScreen = () => {
  const [Data, setData] = useState({
    Name: '',
    Age: '',
    SelectedItem: '',
  });

  const whenTextBoxChanged = (e, key) => {
    setData(prev => ({
      ...prev,
      [key]: e
    }));
  };

  return (
    <PaperProvider>
      <View style={styles.container}>

        {/* Normal TextBox */}
        <TextBox
          label="Name"
          value={Data.Name}
          onChange={(e) => whenTextBoxChanged(e, "Name")}
        />

        {/* Numeric TextBox */}
        <TextBox
          label="Age"
          value={Data.Age}
          onChange={(e) => whenTextBoxChanged(e, "Age")}
          onlyInteger={true}
        />

        {/* Dropdown styled exactly like TextBox */}
        <Dropdown
          label="Select Item"
          data={[
            { UID: 1, desc: 'Item 1' },
            { UID: 2, desc: 'Item 2' },
            { UID: 3, desc: 'Item 3' },
          ]}
          value={Data.SelectedItem}
          onChange={(val) => whenTextBoxChanged(val, "SelectedItem")}
          displayExpr="desc"
          valueExpr="UID"
        />


      </View>

      <Toast />
    </PaperProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.textLight,
  },
});
