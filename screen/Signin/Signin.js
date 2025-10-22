import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { PaperProvider } from 'react-native-paper';
import Toast from "react-native-toast-message";
import Button from '../../component/Button/Button';
import TextBox from '../../component/TextBox/TextBox';
import Dropdown from '../../component/DropDown/DropDown';
import { colors } from '../../component/config/config';
import { getFromAPI, postToAPI } from "../../apicall/apicall";

const LoginScreen = () => {
  const [Data, setData] = useState(
    {
      "name": "",
      "phone": "",
      "dob": "",
      "gender": "",
      "bloodGroup": "",
      "city": "",
      "state": "",
      "country": "India",
      "status": "",
      "role": "",
      "reportCounts": 0,
      "reportReasonList": [],
      "historyOfDonations": [],
      "extraField1": "",
      "extraField2": "",
    }
  );
  const [DD, setDD] = useState({
    Blood: [],
    State: [],
    City: [],
  })

  useEffect(() => {
    initialFetch()
  }, [])

  const initialFetch = async () => {
    const blood = { type: "BloodGroup" };
    const state = { type: "State" };

    try {
      const [bloodResp, stateResp] = await Promise.all([
        getFromAPI("/get-dropdowns?data=" + encodeURIComponent(JSON.stringify(blood))),
        getFromAPI("/get-dropdowns?data=" + encodeURIComponent(JSON.stringify(state))),
      ]);
      // console.log("Blood:", JSON.stringify(bloodResp.data[0] , null , 2));
      setDD({
        Blood: bloodResp.data,
        State: stateResp.data,
        City: [],
      })

    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const whenTextBoxChanged = (e, key) => {
    setData(prev => ({
      ...prev,
      [key]: e
    }));
  };

  const whenStateChanged = async (e, key) => {
    setData(prev => ({
      ...prev,
      city: '',
      [key]: e
    }));
    try {
      const city = { type: "District", params1: DD.State.find((item) => item.latitude == e)?.isoCode };
      // ✅ Run all requests in parallel
      const [cityResp] = await Promise.all([
        getFromAPI("/get-dropdowns?data=" + encodeURIComponent(JSON.stringify(city))),
      ]);
      setDD((prev) => ({
        ...prev,
        City: cityResp.data
      }))
    }
    catch (e) {
      console.log("eroor", e)
    }
  };

  const validationsBeforeSubmit = () => {
    //validations go here
    handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      let DataToApi = {
        ...Data,
        UID: 0,
        state: DD.State.find((item) => item.latitude == Data.state)?.name,
        city: DD.City.find((item) => item.latitude == Data.city)?.name,
      }
      console.log("DataToApi", JSON.stringify(DataToApi, null, 2))
      const resp = await postToAPI('/insert-update-user', DataToApi)
      console.log("Response after save ", resp)
    }
    catch (e) {
      console.log("Error in Save ", e)
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>

        {/* Normal TextBox */}
        <TextBox
          label="Full Name"
          value={Data.name}
          onChange={(e) => whenTextBoxChanged(e, "name")}
        />

        {/* Numeric TextBox */}
        <TextBox
          label="Phone Number"
          value={Data.phone}
          onChange={(e) => whenTextBoxChanged(e, "phone")}
          onlyInteger={true}
          maxChar={10}
        />

        <TextBox
          label="Country"
          value="India"
          onChange={(e) => null}
          disabled
        />

        {/* Dropdown styled exactly like TextBox */}
        <Dropdown
          label="Select State"
          data={DD.State}
          value={Data.state}
          onChange={(val) => whenStateChanged(val, "state")}
          displayExpr="name"
          valueExpr="latitude"
        />

        <Dropdown
          label="Select City"
          data={DD.City}
          value={Data.city}
          onChange={(val) => whenTextBoxChanged(val, "city")}
          displayExpr="name"
          valueExpr="latitude"
        />

        <Dropdown
          label="Select Your Blood Group"
          data={DD.Blood}
          value={Data.bloodGroup}
          onChange={(val) => whenTextBoxChanged(val, "bloodGroup")}
          displayExpr="Description"
          valueExpr="UID"
        />

        <Button
          name="Register"
          // backgroundColor="#2A9D8F"
          // color="#fff"
          // width={220}
          onClicked={() => validationsBeforeSubmit()}
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
