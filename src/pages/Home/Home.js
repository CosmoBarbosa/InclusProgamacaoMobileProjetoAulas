import React, { useEffect } from 'react';
import { View,StyleSheet, Text, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  
  const list = ["cosmo", "giovanna", "grazi", "joao"]

  function Reder(item){
    console.log(item)
    return(
      <Text>{item.item}</Text>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.lista} data={list} renderItem={Reder}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  lista:{
    alignSelf:"center",
    marginTop:140
  }
  
});
