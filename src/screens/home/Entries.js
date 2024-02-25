import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/firebase'
import ListItem from '../../components/ListItem';
import database from '@react-native-firebase/database'
import Loader from '../../components/Loader';


export default function Entries({navigation}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // getData().then((data) => {
    //   setData(data)
    // }).catch((res) => {
    //   console.log("🚀 ~ getData ~ res:", res)
    // })

    database()
      .ref('/users')
      .on('value', snapshot => {
        const data = snapshot.val();
        setData(data);
        setIsLoading(false)
      }, error => {
        console.log(error);
        setIsLoading(false)
      });
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {data && Object.keys(data).length > 0 ? (
          Object.keys(data).map((userId) => (
            <ListItem key={userId} data={data[userId]} userId={userId} navigation={navigation} />
          ))
        ) : (
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text>No records found.</Text>
          </View>
        )}

      </ScrollView>
      <Loader isLoading={isLoading}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
})