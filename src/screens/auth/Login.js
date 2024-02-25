import { StyleSheet, Text, View, Image, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../navigation/AuthContext'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { validateEmail, validatePassword } from '../../utils/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

export default function Login({ navigation }) {
  const { isLogin, changeLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function _handleLogin() {
    if (!validateEmail(email)) {
      setError({ email: 'Please enter valid email address.' });
    } else if (!validatePassword(password)) {
      setError({ password: 'Password must be at least 6 characters long.' });
    } else {
      setError({});
      doLogin();
    }
  }
  async function doLogin() {
    setIsLoading(true)
    const prev_data = await AsyncStorage.getItem('all_users');
    const prev = JSON.parse(prev_data);
    let data = [];
    if (prev) {
      const isExist = prev?.find((item => item.email == email));

      if (isExist) {
        if (isExist?.password == password) {
          await AsyncStorage.setItem('login_user', JSON.stringify({ ...isExist, isLogin: true }));
          changeLogin(true);
          setIsLoading(false)
        } else {
          setIsLoading(false)
          Alert.alert('Error', 'Wrong password please try again.');
          return;
        }
      } else {
        setIsLoading(false)
        Alert.alert('Error', 'This email address is not registered');
        return;
      }
    } else {
      setIsLoading(false)
      Alert.alert('Error', 'This email address is not registered');
      return;
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/images/user-img.png")} style={styles.image} />
      <Input placeholder="Email address" value={email} onChange={(val) => { setEmail(val) }} style={styles.inputStyle} error={error?.email} />
      <Input isPassword={true} placeholder="Password" value={password} onChange={(val) => { setPassword(val) }} style={styles.inputStyle} error={error?.password} />
      <Button title="Login" onPress={_handleLogin} containerStyle={styles.button} />
      <TouchableOpacity style={styles.touchable} onPress={() => { navigation.navigate('Register') }}>
        <Text>{"Create new account"}</Text>
      </TouchableOpacity>
      <Loader isLoading={isLoading} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  image: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 200,
    aspectRatio: 2 / 2,
  },
  inputStyle: {

    marginVertical: 10

  },
  button: {
    marginVertical: 20
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})