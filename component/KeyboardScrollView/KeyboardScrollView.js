import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  View
} from "react-native";

const KeyboardScrollView = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.innerView}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // default background, can be changed if needed
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16, // default padding
  },
  innerView: {
    flex: 1,
  },
});
