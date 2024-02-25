import database from '@react-native-firebase/database'


export const getData = () => {
    return new Promise((resolve, reject) => {
        database()
            .ref('/users')
            .on('value', snapshot => {
                const data = snapshot.val();
                resolve(data);
            }, error => {
                reject(error);
            });
    });
};

export const storeUserData = (data) => {
    return database()
        .ref('/users/')
        .push(data);

}
export const updateSingleUser = (id = null, data = {}) => {
    return database().ref(`users/${id}`).update(data);
}

export const deleteUserData = (userId) => {
    return database().ref(`users/${userId}`).remove();
}