import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'


export default function Input(props) {
    const {
        style,
        onChange,
        value,
        isPassword = false,
        error="",
        ...rest
    } = props;

    const [isFocus, setIsFocus] = useState(false);
    const [isPass, setIsPass] = useState(isPassword);
    const changeFocusStyle = { borderWidth: (isFocus) ? 1.6 : 1, borderColor: (isFocus) ? 'black' : 'gray' }

    return (
        <View>
            <TextInput
                style={[styles.input, changeFocusStyle, style]}
                value={value}
                onChangeText={onChange}
                secureTextEntry={isPass}
                onFocus={() => { setIsFocus(true) }}
                onBlur={() => { setIsFocus(false) }}
                {...rest}
            />
            {
                error&&<Text style={styles.error}>{error}</Text>
            }

            {
                (isPassword) ?
                    (isPass) ?
                        <TouchableOpacity onPress={() => { setIsPass(false) }} style={[styles.eye,{marginVertical:style?.marginVertical}]}>
                            <Feather name="eye" size={25} color={'black'} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setIsPass(true) }} style={[styles.eye,{marginVertical:style?.marginVertical}]}>
                            <Feather name="eye-off" size={25} color={'black'} />
                        </TouchableOpacity> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        fontSize: 16,
        borderRadius: 5,
        paddingHorizontal: 12,
        height: 50,
    },
    eye: {
        position: 'absolute',
        height:50,
        right: 12,
        justifyContent:'center',
        alignItems:'center',
        zIndex: 99,
    },
    error:{
        color:'red',
        fontSize:12,
        marginHorizontal:5,
        marginTop:-2
    }
})