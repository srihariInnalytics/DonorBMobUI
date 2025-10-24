import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Avatar, Card, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuth } from '../../auth/AuthContext'
import { postToAPI, getFromAPI } from '../../apicall/apicall'
import { getAPIFormat } from '../../apicall/apifFromats'
import Toast from "react-native-toast-message";
import Loader from '../../component/Loader/Loader'
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [UserData, setUserData] = useState({})
  const [Load, setLoad] = useState(false)
  const navigation = useNavigation();

  const onLogout = async () => {
    try {
      setLoad(true)
      logout();//to remove token in use AUth
      navigation.replace("Signin");
    } catch (e) {
      console.log("ERROR:", e);
    }
    finally {
      setLoad(false)
    }
  };



  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Avatar.Text size={80} label='Test' style={styles.avatar} />
        <Text style={styles.name}> {UserData.employeeName} </Text>
        <Text style={styles.uid}>UID: {UserData.employeeID} </Text>
      </View>

      {/* Leave & Experience */}
      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Total Leave</Text>
          <Text style={styles.statsValue}>{UserData.totalLeaveCount}</Text>
        </Card>
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>Total Expense</Text>
          <Text style={styles.statsValue}>{UserData.totalExpenseCount}</Text>
        </Card>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <DetailItem label="Department" value={UserData.department} />
        <DetailItem label="Designation" value={UserData.designation} />
        <DetailItem label="Personal No" value={UserData.phoneNumber} />
        <DetailItem label="Office No" value={UserData.mobileNumber} />
        <DetailItem label="Address" value={UserData.address} />
      </View>

      {/* Dark Theme & Logout */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.logoutText}>Logout all Devices</Text>
        </TouchableOpacity>
      </View>


      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout from all devices?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={onLogout}>
                <Text style={styles.confirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}> {label}</Text>
    <Text style={styles.detailValue}>: {value} </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: "#D32F2F",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  uid: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statsCard: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 10,
  },
  statsTitle: {
    fontSize: 16,
    color: "#666",
  },
  statsValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    padding: 10,
    flexShrink: 1, // Prevent overflow
    flexWrap: "wrap" // Ensure text wraps
  },
  themeToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  footerText: {
    fontSize: 16,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "#D32F2F",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white", },
  modalContent: { width: 300, padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center", },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalMessage: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  cancelButton: { flex: 1, padding: 10, alignItems: "center", backgroundColor: "#ccc", borderRadius: 5, marginRight: 5 },
  confirmButton: { flex: 1, padding: 10, alignItems: "center", backgroundColor: "#D32F2F", borderRadius: 5 },
  cancelText: { fontSize: 16, color: "#333" },
  confirmText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
});

export default ProfileScreen;