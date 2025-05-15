import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../icons/inclus.png';

export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("Login")
    },3000)
  }, [])
 
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <ActivityIndicator size="large" color="#fff" style={styles.spinner} />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius:100
  },
  spinner: {
    marginTop: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
});
