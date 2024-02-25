import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './AuthStack'
import MainStack from './MainStack'
import AuthContext from './AuthContext'

export default function RootNavigation() {
    const [isLogin, setIsLogin] = useState(false);
    function changeLogin(val) {
        setIsLogin(val);
    }

    useEffect(()=>{
        checkUserLogin();
    },[])

    const checkUserLogin=async()=>{
        const u_data= await AsyncStorage.getItem('login_user');
        const user_data=JSON.parse(u_data);
        if(user_data?.isLogin??false){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    }

    return (

        <AuthContext.Provider value={{ isLogin: isLogin, changeLogin: changeLogin }}>
            <NavigationContainer>
                {
                    (isLogin) ?
                        <MainStack />
                        :
                        <AuthStack />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    )
}