import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../icon/logo.png';
import { useCallback } from "react"
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


export default function SplashScreen() {

  const navigation = useNavigation();

  async function getToken() {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      return result;
    } else {
      return false;
    }
  }

  async function redirectTo() {
    const token = await getToken();
    if (token) {
      navigation.navigate("Home");
      return;
    }
    navigation.navigate("Login");
    return;
  }

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        redirectTo();
      }, 3000)
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <ActivityIndicator size="large" color="#000" style={styles.spinner} />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 100
  },
  spinner: {
    marginTop: 20,
  },
  loadingText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
});
