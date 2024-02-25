import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../navigation/AuthContext'

export default function BtnLogout() {

    const {changeLogin}=useContext(AuthContext);
    async function _handleLogout(){
      await AsyncStorage.removeItem('login_user')
      changeLogin(false);
      
    }
  return (
    <TouchableOpacity style={styles.container} onPress={_handleLogout}>
        <Icon name={"logout"} size={25} color={"#fff"}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        bottom:80,
        right:20,
        position:'absolute',
        backgroundColor:'#007AFF',
        height:50,width:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden'
    }
})