import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { PaperProvider } from 'react-native-paper';
import { colors } from '../../component/config/config';
import { getFromAPI, postToAPI } from "../../apicall/apicall";
import { isMissingFields } from '../../shared/sharedFunctions'
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import Button from '../../component/Button/Button';
import TextBox from '../../component/TextBox/TextBox';
import KeyboardScrollView from '../../component/KeyboardScrollView/KeyboardScrollView'
import Dropdown from '../../component/DropDown/DropDown';
import DateBox from '../../component/DateBox/DateBox'
import HeartLoader from '../../component/HeartLoader/HeartLoader' // heratLoader
import Loader from '../../component/Loader/Loader' // normal loader

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
  const [Missing, setMissing] = useState(false)
  const [Load, setLoad] = useState(false)
  const navigation = useNavigation(); // Initialize navigation
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
    const validate = ["name", "phone", "state", "city", "bloodGroup"]
    if (isMissingFields(Data, validate)) {
      setMissing(true)
      return
    }
    setMissing(false)
    handleSubmit()
  }

  const handleSubmit = async () => {
    try {
      setLoad(true)
      let DataToApi = {
        ...Data,
        UID: 0,
        state: DD.State.find((item) => item.latitude == Data.state)?.name,
        city: DD.City.find((item) => item.latitude == Data.city)?.name,
      }
      // console.log("DataToApi", JSON.stringify(DataToApi, null, 2))
      const resp = await postToAPI('/insert-update-user', DataToApi)
      console.log("Response after save ", resp)
      if (resp.success == 1) {
        await AsyncStorage.setItem('BloodToken', JSON.stringify({ DummyToken: 1 }));

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Data inserted successfully",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
      else if (resp.success == 2) {
        console.log("Inside else if")
        Toast.show({
          type: "error",
          text1: "Mobile Number already exists",
          text2: "Kindly login or use another phone number",
        });
      }
      else {
        console.log("Inside else")
        Toast.show({
          type: "error",
          text1: "Cannot Register",
          text2: "Kindly try after some time ",
        });
      }

    }
    catch (e) {
      console.log("Error in Save ", e)
      Toast.show({
        type: "error",
        text1: "Cannot Register",
        text2: "Kindly try after some time ",
      });
    }
    finally {
      setLoad(false)
    }
  }

  return (
    <PaperProvider>
      <HeartLoader load={Load} />
      <KeyboardScrollView>

        <TextBox
          label="Full Name"
          value={Data.name}
          onChange={(e) => whenTextBoxChanged(e, "name")}
          missing={Missing}
        />

        <TextBox
          label="Phone Number"
          value={Data.phone}
          onChange={(e) => whenTextBoxChanged(e, "phone")}
          onlyInteger={true}
          maxChar={10}
          missing={Missing}
          missingMessage="Enter a valid phone number"
        />

        <TextBox
          label="Country"
          value="India"
          onChange={(e) => null}
          disabled

        />

        <Dropdown
          label="Select State"
          data={DD.State}
          value={Data.state}
          onChange={(val) => whenStateChanged(val, "state")}
          displayExpr="name"
          valueExpr="latitude"
          missing={Missing}
        />

        <Dropdown
          label="Select City"
          data={DD.City}
          value={Data.city}
          onChange={(val) => whenTextBoxChanged(val, "city")}
          displayExpr="name"
          valueExpr="latitude"
          disabled={DD.City.length == 0}
          missing={Missing}
        />

        <Dropdown
          label="Select Your Blood Group"
          data={DD.Blood}
          value={Data.bloodGroup}
          onChange={(val) => whenTextBoxChanged(val, "bloodGroup")}
          displayExpr="Description"
          valueExpr="UID"
          missing={Missing}
        />

        <Button
          name="Register"
          // backgroundColor="#2A9D8F"
          // color="#fff"
          // width={220}
          onClicked={() => validationsBeforeSubmit()}
        />

      </KeyboardScrollView>
    </PaperProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.textLight,
  },
});
