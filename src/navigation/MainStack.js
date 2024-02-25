import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/home/Home';
import Tabbar from './Tabbar';
import Entries from '../screens/home/Entries';
import { createStackNavigator } from '@react-navigation/stack'
import EditUser from '../screens/home/EditUser';
import BtnLogout from '../components/BtnLogout';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function BottomTabBar() {
  return (
    <>
      <Tab.Navigator tabBar={(props) => <Tabbar {...props} />} screenOptions={{ headerTitleAlign: 'center' }}>
        <Tab.Screen name='Home' component={Home} options={{ title: "Add new entry" }} />
        <Tab.Screen name='Entries' component={Entries} />
      </Tab.Navigator>
      <BtnLogout />
    </>
  );
}
export default function MainStack() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='BottomTabs'>
        <Stack.Screen name="BottomTabs" component={BottomTabBar} />
        <Stack.Screen name="EditUser" component={EditUser} />
      </Stack.Navigator>
      {/* <BtnLogout/> */}
    </>
  )
}

const styles = StyleSheet.create({})