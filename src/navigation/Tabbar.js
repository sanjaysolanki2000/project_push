import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import Entypo from 'react-native-vector-icons/Entypo'

export default function Tabbar(props) {
  const { navigation, state } = props
  const { index } = state;
  const tabs = [
    { title: "Home", route: 'Home', icon: "home" },
    { title: "Entries", route: 'Entries', icon: "list" }
  ];
  return (
    <View style={styles.container}>
      {
        tabs?.map((item, i) => {

          return (
            
              <TouchableOpacity
                key={item.route}
                onPress={() => { navigation.navigate(item.route) }}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 }}>
                <Entypo style={(i==index)?styles.iconSelected:styles.icon} name={item.icon} size={20} />
                <Text style={(i==index)?styles.titleSelected:styles.title} >{item.title}</Text>
              </TouchableOpacity>
          
          );
        })
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  title: {
    color: 'gray',
  },
  titleSelected: {
    color: 'black',
    fontWeight: 'bold'
  },
  icon: {
    color: 'gray',
  },
  iconSelected: {
    color: 'black',
  }
})