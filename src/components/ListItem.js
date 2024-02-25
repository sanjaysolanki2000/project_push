import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { deleteUserData } from '../utils/firebase'

export default function ListItem({ data, userId, navigation }) {

    function _deleteItem() {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete user data?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        deleteUserData(userId);
                    },
                },
            ],
            { cancelable: false }
        );

    }

    function _editUser() {
        navigation.navigate('EditUser',
            {
                userData: {
                    userId:userId,
                    name: data?.name,
                    email: data?.email,
                    mobile_no: data?.mobile_no,
                }
            })
    }
    return (
        <View style={styles.card}>
            <View>
                <Text numberOfLines={1} style={{ marginHorizontal: 2, fontSize: 16, fontWeight: 'bold' }}>{data?.name}</Text>
                <Text numberOfLines={1} style={{ marginHorizontal: 5, fontSize: 14 }}>{data?.email}</Text>
                <Text numberOfLines={1} style={{ marginHorizontal: 5, fontSize: 14 }}>{data?.mobile_no}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.icon} onPress={_editUser}>
                    <IonIcon name="create-outline" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={_deleteItem}>
                    <IonIcon name="trash-outline" size={25} color={'red'} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 3,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: '#afafaf'
    },
    icon: {
        padding: 5,
    }
})