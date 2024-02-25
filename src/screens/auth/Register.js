import { StyleSheet, Image, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../navigation/AuthContext'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { validateEmail, validatePassword } from '../../utils/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

export default function Register() {
  const { isLogin, changeLogin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function _handleRegistration() {
    if (name == '') {
      setError({ name: 'Please enter valid name.' });
    } else if (!validateEmail(email)) {
      setError({ email: 'Please enter valid email address.' });
    } else if (!validatePassword(password)) {
      setError({ password: 'Password must be at least 6 characters long and contain at least 1 number, 1 symbol, and 1 uppercase letter.' });
    } else {
      setError({});
      saveData();
    }
  }
  async function saveData() {
    setIsLoading(true)
    const prev_data = await AsyncStorage.getItem('all_users');
    const prev = JSON.parse(prev_data);
    let data = [];
    if (prev) {
      const isExist = prev?.find((item => item.email == email));

      if (isExist) {
        setIsLoading(false)
        Alert.alert('Error', 'Oops! It seems like this email address is already in use.');
        return;
      }

      data = [...prev, { name: name, email: email, password: password }]
    } else {
      data = [{ name: name, email: email, password: password }]
    }

    const data2 = { name: name, email: email, password: password, isLogin: true };

    await AsyncStorage.setItem('all_users', JSON.stringify(data));
    await AsyncStorage.setItem('login_user', JSON.stringify(data2));
    changeLogin(true);
    setIsLoading(false)
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/images/user-img.png")} style={styles.image} />

      <Input placeholder="Name" value={name} onChange={(val) => { setName(val) }} style={styles.inputStyle} error={error?.name} />
      <Input placeholder="Email address" value={email} onChange={(val) => { setEmail(val) }} style={styles.inputStyle} error={error?.email} />
      <Input isPassword={true} placeholder="Password" value={password} onChange={(val) => { setPassword(val) }} style={styles.inputStyle} error={error?.password} />
      <Button title="Register" onPress={_handleRegistration} containerStyle={styles.button} />
      <Loader isLoading={isLoading}/>
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
  
})