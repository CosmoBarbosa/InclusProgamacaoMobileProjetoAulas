import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { saveValue } from './script';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Scan() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setscanned] = useState(false);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };
  useEffect(() => {
    getCameraPermissions();
  }, []);
  useFocusEffect(
    useCallback(() => {
      setscanned(false);
    }, []));
  const handleBarCodeScanned = async ({ type, data }) => {

    try {
      let dat = JSON.parse(data);
      // Lista das propriedades permitidas
      const allowedKeys = [
        "id",
        "nome"
      ];
      // Verifica se todas as chaves permitidas existem e estão preenchidas, e não há chaves extras
      if (
        allowedKeys.every(key => dat[key] !== undefined && dat[key] !== 0 && dat[key] !== "") &&
        Object.keys(dat).every(key => allowedKeys.includes(key))
      ) {
        await saveValue(data);
        setscanned(true);
        navigation.navigate('Home');
        return true;
      } else {
        setscanned(true);
        Alert.alert(
          'QRCode',
          `Tipo: ${type}\nQRCode Inválido!`,
          [{ text: 'Tentar Novamente', onPress: () => setscanned(false) }]
        );
      }

    } catch (error) {
      alert(`Erro ao escaneacr QR:\n${error.toString()}`);
    }
  };

  if (hasPermission === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1D0D55',
        }}>
        <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>
          Requesting for camera permission
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1D0D55',
        }}>
        <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>
          No access to camera
        </Text>
        <Button title="Request Acess" onPress={() => getCameraPermissions()} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={{ color: "#fff", alignSelf: "center", marginBottom: 10 }}>Aponte a câmera para o QR Code Exibido na Matricula!</Text>
      <View style={{ width: 300, height: 300, borderRadius: 40, borderColor: "#fff", borderWidth: 3, justifyContent: "center", alignSelf: "center", }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1D0D55',
    padding: 8,
  },
});