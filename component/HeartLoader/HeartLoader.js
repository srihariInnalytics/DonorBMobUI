import React, { useEffect, useRef } from 'react';
import { View, Modal, Animated, Text, StyleSheet } from 'react-native';
import { colors } from '../config/config';

const Loader = ({ load }) => {
  const scale = useRef(new Animated.Value(1)).current;       // Heartbeat
  const spin = useRef(new Animated.Value(0)).current;        // Outer spinning circle

  useEffect(() => {
    if (load) {
      // Heartbeat animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();

      // Outer circle spin animation
      Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        })
      ).start();
    } else {
      scale.stopAnimation();
      spin.stopAnimation();
    }
  }, [load]);

  if (!load) return null;

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal visible={load} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.loaderContainer, { transform: [{ scale }] }]}>
          {/* Outer spinning ring */}
          <Animated.View style={[styles.outerRing, { transform: [{ rotate }] }]} />

          {/* Heart in center */}
          <Text style={styles.heart}>❤️</Text>

          {/* Loading text */}
          <Animated.Text
            style={[
              styles.loadingText,
              {
                opacity: scale.interpolate({
                  inputRange: [1, 1.2],
                  outputRange: [0.8, 1],
                }),
              },
            ]}
          >
            Loading...
          </Animated.Text>
        </Animated.View>
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
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  heart: {
    fontSize: 70,
    color: colors.primary,
    textAlign: 'center',
    zIndex: 2,
  },
  loadingText: {
    marginTop: 15,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
    letterSpacing: 0.8,
    zIndex: 2,
  },
  outerRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: colors.primary,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
});

export default Loader;
