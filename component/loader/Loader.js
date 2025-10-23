import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Animated, Text } from 'react-native';
import { colors } from '../../component/config/config';

const Loader = ({ load }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (load) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
    }
  }, [load]);

  return (
    <Modal
      visible={load}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
            Loading, please wait...
          </Animated.Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: 12,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Loader;
