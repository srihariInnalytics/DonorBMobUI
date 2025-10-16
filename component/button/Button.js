import React from 'react'
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export const MyButton = ({ title, onPress  }) => {
    return (
        <Button
            title={title}
            buttonStyle={styles.Button}
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    Button: {
        width: 300 ,
        backgroundColor: 'purple',
    },
})