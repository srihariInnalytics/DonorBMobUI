import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { colors } from '../../component/config/config';

const TextBox = ({
    label,
    onlyInteger = false,
    value,
    onChange,
    disabled = false,
    maxChar = 50, // ✅ new parameter to limit characters
    missing = false, // this will missing  fields 
    missingMessage = 'Enter this field' //custom mesage
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChangeText = (text) => {
        let newText = text;

        // ✅ Allow only numbers if onlyInteger is true
        if (onlyInteger) {
            newText = newText.replace(/[^0-9]/g, '');
        }

        // ✅ Limit characters if maxChar is set
        if (maxChar && newText.length > maxChar) {
            newText = newText.substring(0, maxChar);
        }

        onChange(newText);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <PaperInput
                    label={label}
                    value={value}
                    onChangeText={handleChangeText}
                    mode="outlined"
                    style={styles.input}
                    theme={{
                        colors: {
                            primary: colors.primary,       // floating label & outline on focus
                            text: 'black',              // input text
                            placeholder: 'gray',        // placeholder
                            background: colors.textLight, // textbox background
                            outline: 'gray',            // border when not focused
                        },
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    contentStyle={{ paddingVertical: 10 }}
                    keyboardType={onlyInteger ? 'numeric' : 'default'}
                />
                {missing && (value == '' || value == 0 || value == 'undefined' || value == null) &&
                    < Text style={styles.error}>{missingMessage}</Text>
                }
            </View>
        </TouchableWithoutFeedback >
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
    error: {
        color: 'red',
        marginTop: 4,
        fontSize: 14,
        marginLeft: 3
    }
});
