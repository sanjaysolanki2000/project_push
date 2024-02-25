
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { validateEmail, validateMobileNumber } from '../../utils/Validation'
import { storeUserData } from '../../utils/firebase'

export default function Home() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_no, setMobile_no] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function _handleSubmit() {
        if (name == '') {
            setError({ name: 'Please enter valid name.' });
        } else if (!validateEmail(email)) {
            setError({ email: 'Please enter valid email address.' });
        } else if (!validateMobileNumber(mobile_no)) {
            setError({ mobile_no: 'Please enter valid mobile number' });
        } else {
            setError({});
            saveUserData();
        }
    }

    function saveUserData() {
        setIsLoading(true)
        storeUserData({ name: name, email: email, mobile_no: mobile_no }).then((data) => {
            ToastAndroid.showWithGravity(
                'Data Added',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setName('')
            setEmail('')
            setMobile_no('')
            setIsLoading(false);
        }).catch((error) => {
            ToastAndroid.showWithGravity(
                'Getting Error please try again.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            setIsLoading(false);
        })
    }


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Input placeholder="Name" value={name} onChange={(val) => { setName(val) }} style={styles.inputStyle} error={error?.name} />
                <Input placeholder="Email address" value={email} onChange={(val) => { setEmail(val) }} style={styles.inputStyle} error={error?.email} />
                <Input placeholder="Mobile number" maxLength={10} keyboardType='numeric' value={mobile_no} onChange={(val) => { setMobile_no(val) }} style={styles.inputStyle} error={error?.mobile_no} />
                <Button title="Submit" onPress={_handleSubmit} containerStyle={styles.button} />

            </ScrollView>
            <Loader isLoading={isLoading} />
        </View>
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