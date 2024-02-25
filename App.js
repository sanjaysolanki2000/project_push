import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'
import firebase from '@react-native-firebase/app';
import { getData, storeUserData } from './src/utils/firebase';
import Input from './src/components/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';


export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <RootNavigation/>
    </SafeAreaView>
  )
}