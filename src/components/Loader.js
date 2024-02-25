import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get('screen');

export default function Loader({ isLoading=false }) {
    return (
        <>
          {isLoading&&<View style={styles.container}>
                <ActivityIndicator size={35} color={'#007AFF'} />
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height, width,
        position: 'absolute',
        backgroundColor: 'transparent',
        justifyContent: 'center', alignItems: 'center',
    }
})