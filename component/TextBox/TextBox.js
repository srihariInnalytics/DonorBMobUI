import React from 'react'
import { TextInput as PaperInput } from 'react-native-paper';
import { colors } from '../../component/config/config';

function TextBox({ label, value, onChange, mode = 'outlined', disabled }) {
    return (
        <View style={styles.row}>
            <PaperInput
                label={label}
                value={value}
                style={styles.input} // ✅ Corrected style applied
                onChangeText={onChange}
                mode={mode}
                theme={{
                    colors: {
                        primary: colors.data,
                        error: colors.error,
                        outline: colors.data,
                        disabled: 'red',
                    },
                    roundness: 4,
                }}
                disabled={disabled}
            />
        </View>
    )
}

export default TextBox

const styles = StyleSheet.create({
    row: {
        flexDirection: 'column', // ✅ Ensures error text appears below input
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginRight: 5,
        backgroundColor: colors.textLight,
        color: "black"
    },
})