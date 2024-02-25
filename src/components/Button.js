import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button(props) {
    const { title, onPress, containerStyle,titleStyle, ...rest } = props
    return (
        <>
            <TouchableOpacity style={[styles.buttonContainer,containerStyle]} onPress={onPress}>
                <Text style={[styles.title,titleStyle]}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius:5,
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'#fff',
        fontWeight:'600',
        fontSize:16,
        letterSpacing:0.5
    }

})