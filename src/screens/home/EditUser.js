
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { validateEmail, validateMobileNumber } from '../../utils/Validation'
import { storeUserData, updateSingleUser } from '../../utils/firebase'

export default function EditUser({ route, navigation }) {
  const { userData } = route?.params;
  const [name, setName] = useState(userData?.name ?? '');
  const [email, setEmail] = useState(userData?.email ?? '');
  const [mobile_no, setMobile_no] = useState(userData?.mobile_no ?? '');
  const [userId, setUserId] = useState(userData?.userId ?? '');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function _handleUpdate() {
    if (name == '') {
      setError({ name: 'Please enter valid name.' });
    } else if (!validateEmail(email)) {
      setError({ email: 'Please enter valid email address.' });
    } else if (!validateMobileNumber(mobile_no)) {
      setError({ mobile_no: 'Please enter valid mobile number' });
    } else {
      setError({});
      updateUserData();
    }
  }

  function updateUserData() {
    setIsLoading(true)
    updateSingleUser(userId, { name: name, email: email, mobile_no: mobile_no })
      .then(() => {
        ToastAndroid.showWithGravity(
          'User Updated',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        navigation.goBack();
      }).catch(() => {
        ToastAndroid.showWithGravity(
          'Getting error please try again.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );

      })
  }


  return (
    <>
      <View style={{ backgroundColor: 'white', height: 55, justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ fontSize: 20, fontWeight: '500', color: '#000000' }}>{"Edit Entry"}</Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Input placeholder="Name" value={name} onChange={(val) => { setName(val) }} style={styles.inputStyle} error={error?.name} />
          <Input placeholder="Email address" value={email} onChange={(val) => { setEmail(val) }} style={styles.inputStyle} error={error?.email} />
          <Input placeholder="Mobile number" maxLength={10} keyboardType='numeric' value={mobile_no} onChange={(val) => { setMobile_no(val) }} style={styles.inputStyle} error={error?.mobile_no} />
          <Button title="Update" onPress={_handleUpdate} containerStyle={styles.button} />

        </ScrollView>
        <Loader isLoading={isLoading} />
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold'
  },
  inputStyle: {

    marginVertical: 10

  },
  button: {
    marginVertical: 20
  },

})