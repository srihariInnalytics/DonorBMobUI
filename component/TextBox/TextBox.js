import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { colors } from '../../component/config/config';

const TextBox = ({ label, onlyInteger = false, value, onChange, disabled = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <PaperInput
                    label={label}
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    theme={{
                        colors: {
                            primary: colors.data,       // floating label & outline on focus
                            text: 'black',              // input text
                            placeholder: 'gray',        // placeholder
                            background: colors.textLight, // textbox background
                            outline: 'gray',            // border when not focused
                        },
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    contentStyle={{ paddingVertical: 10 }} // ✅ adds space for label
                    keyboardType={onlyInteger ? 'numeric' : 'text'}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default TextBox;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    input: {
        fontSize: 16,
        borderRadius: 6,
        backgroundColor: colors.textLight,
    },
});
