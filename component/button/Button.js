import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../component/config/config';

const Button = ({
  name = 'Click Me',
  backgroundColor = colors?.primary || '#007BFF',
  color = '#fff',
  width = 350,
  height = 50,
  onClicked = () => {},
  borderRadius = 8,
  fontSize = 16,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          width,
          height,
          borderRadius,
        },
      ]}
      activeOpacity={0.7}
      onPress={onClicked}
    >
      <Text style={[styles.text, { color, fontSize }]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center', // ✅ center the button horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
