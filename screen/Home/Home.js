//This is the main screen which has the sidebar and this loads the content inside it
import React, { useState, useRef, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors as colorss } from "../../component/config/config";
import { Menu, IconButton, Drawer } from "react-native-paper";
import { useAuth } from "../../auth/AuthContext";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout"; // ✅ Import DrawerLayout
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Dummy from "../Dummy/Dummy";
import Dashboard from "../Dashboard/Dashboard";

const SCREEN_WIDTH = Dimensions.get("window").width; // Get screen width

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const drawerRef = useRef(null); // ✅ Reference for the Drawer
  const [menuVisible, setMenuVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer open/close
  const menus = {
    attendance: "Attendance",
    dummy: 'Dummy'
  }
  const [active, setActive] = useState(menus.dashboard); // State to track active menu item

  const handleLogout = async () => {
    setMenuVisible(false);
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      drawerRef.current.closeDrawer();
    } else {
      drawerRef.current.openDrawer();
    }
    setIsDrawerOpen(!isDrawerOpen);
  };


  //this is the content inside the drawer
  const renderDrawer = () => (
    <View style={styles.drawerContainer}>
      <Drawer.Section>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <MaterialIcons name="account-circle" size={40} color={'#ec4242'} />
            <View style={{ flexDirection: 'column' }}>
              {/* <Text style={{ color: colorss.textDark, fontWeight: 'bold' }}>{user?.userName}</Text> */}
              <Text style={{ color: colorss.textDark, }}>User Name: Dummy User Name</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward" size={25} color="grey" />
        </TouchableOpacity>
      </Drawer.Section>

      <Drawer.Section>

        <Drawer.Item
          icon={() => <FontAwesome5 name="calendar-check" size={25} color="#FF9800" />}
          label="dummy"
          active={active === menus.dummy}
          onPress={() => {
            toggleDrawer();
            setActive(menus.dummy);
          }}
        />

      </Drawer.Section>
    </View>
  );

  //this has the side bar ie placed at left side
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <IconButton
            icon="menu"
            iconColor={colorss.textDark}
            onPress={toggleDrawer} // ✅ Opens drawer
            style={styles.menuButton}
          />
          <Image source={require('../../assets/iec_logo.png')} style={styles.logo} />
        </View>
      ),
      headerStyle: { backgroundColor: colorss.header },
      headerRight: () => (
        <View key={menuVisible.toString()} style={styles.headerRight}>
          <Text style={{ color: colorss.textDark, fontWeight: 'bold' }}>Dummy UserName</Text>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="account-circle"
                iconColor={colorss.textDark}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
          </Menu>
        </View>
      ),
    });
  }, [navigation, menuVisible, isDrawerOpen]); // ✅ Add menuVisible as dependency

  //this has the content inside the container ie view port
  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={SCREEN_WIDTH * 0.7} // Set the width of the drawer
      drawerPosition="left"
      renderNavigationView={renderDrawer}
      onDrawerClose={() => setIsDrawerOpen(false)}
    >
      <View style={styles.container}>
        {
          active === menus.dummy ? <Dummy />
            // : active === menus.dummy ? <Dummy /> // for next route
            : <Dashboard />
        }
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: colorss.textDark,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  menuButton: {
    marginLeft: -10,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fcf9f9",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures proper spacing
    padding: 15,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },

});

export default HomeScreen; 