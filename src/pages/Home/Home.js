import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  FlatList,
  useWindowDimensions,
  Alert,
  Platform,
  ToastAndroid
} from "react-native";
import {
  Provider,
  Button,
  Dialog,
  Text,
  DialogHeader,
  DialogContent,
  DialogActions,
  Stack
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Logo from "../../icon/logo.png";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import api from "../../api/api";
import { baseURL } from "../../api/api";
import { v4 } from 'uuid';

export default function Create() {
  const navigation = useNavigation();
  const window = useWindowDimensions();

  function getLimitedUUID(len) {
    return `${v4().replace(/-/g, '').slice(0, parseInt(len))}`;
  }

  useEffect(() => {
    if (window.width >= 375) {
      getvalue();
      getDocs();
    }
  }, [window.width]);
  function navigateAndReset() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Scan' }],
    });
  };
  const backAction = () => {
    if (exitApp === 0) {
      setExitApp(exitApp + 1);
    } else if (exitApp === 1) {
      setExitApp(exitApp + 1);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Pressione novamente para voltar', ToastAndroid.SHORT);
      }
    } else if (exitApp === 2) {
      setExitApp(0);
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
      }
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [exitApp]);

  const [columns, setColumns] = useState(1);
  const [getFiles, setGetFiles] = useState([]);
  const [exitApp, setExitApp] = useState(0);
  const [vinculo, setVinculo] = useState(null);
  const [buscar, setBuscar] = useState(true);
  const [data, setData] = useState({ visible: false, header: " ", content: " " })

  async function getDocs() {
    try {
      const token = await getToken();
      let res = await api.get("/documentos", {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.data.length > 0) {
        setGetFiles(res.data);
      } else {
        setGetFiles([]);
      }
    }
    catch (error) {
      alert(`Erro ao buscar os documentos:\n${error.toString()}`);
      return false;
    }
  }

  async function getvalue() {
    try {
      let res = await SecureStore.getItemAsync("data");
      if (res) {
        let data = JSON.parse(res);
        setVinculo(data);
        await pickImage(data);
      } else {
        setVinculo(null);
      }

    } catch (error) {
      alert(`Erro ao buscar o valor vinculado:\n${error.toString()}`);
      return false
    }
  }
  async function deleteValue() {
    try {
      await SecureStore.deleteItemAsync("data");
    } catch (error) {
      alert(`Erro ao limpar cache:\n${error.toString()}`);
      return false
    }
  }

  async function getToken() {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      return result;
    } else {
      return false;
    }
  }

  async function EnviarFiles(data, image) {
    try {
      const vinculo = data;
      const token = await getToken();
      if (!token) {
        setData({ visible: true, header: "Error!", content: "Você não está logado!" });
        return;
      }
      if (image.length === 0) {
        setData({ visible: true, header: "Error!", content: "Nenhum arquivo anexado!" });
        return;
      }
      const formData = new FormData();
      formData.append("arquivo", {
        uri: image[0].uri,
        type: image[0].type,
        name: image[0].name,
      });
      formData.append("nome", `${vinculo.nome}-matricula-${vinculo.id}-${getLimitedUUID(15)}.jpg`);
      formData.append("alunoId", vinculo.id);

      await api.post("/documentos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      await deleteValue();
      setData({ visible: true, header: "Sucess!", content: "Arquivo enviado com sucesso!" });

    }
    catch (error) {
      //alert(`Erro ao enviar o arquivo:\n${error.toString()}`);
      setData({ visible: true, header: "Error!", content: `Erro ao enviar o arquivo!\n${error.toString()}` });
    }
  }

  function Clear() {
    getDocs();
    setBuscar(true);
    setData({ visible: false, header: "", content: "" });
    navigation.navigate("Home");
  }

  const pickImage = async (data) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageObjects = result.assets.map(asset => ({
          id: uuidv4(),
          uri: asset.uri,
          type: asset.mimeType,
          name: asset.fileName.trim(),
          width: asset.width,
          height: asset.height,
        }));
        await EnviarFiles(data, imageObjects);
      }
    } catch (error) {
      let errorMsg = "Erro ao enviar o arquivo!";
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        errorMsg += `\nStatus: ${error.response.status}\n${JSON.stringify(error.response.data)}`;
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        errorMsg += "\nSem resposta do servidor.";
      } else {
        // Erro ao configurar a requisição
        errorMsg += `\n${error.message}`;
      }
      setData({ visible: true, header: "Error!", content: errorMsg });
    }
  };

  const renderFileItem = ({ item }) => {
    let nome = item.nome.split("-");
    return (
      <TouchableOpacity style={{ margin: 10, backgroundColor: "orange", width: "100%", height: 60, alignSelf: "center", borderRadius: 10, flexDirection: "row", }}>
        <Image
          source={{ uri: (baseURL + item.caminhoArquivo) }} style={{
            width: 43,
            height: 43,
            margin: 5,
            borderRadius: 100,
            alignSelf: "center",
          }} ></Image>
        <View style={{
          justifyContent: "space-between", paddingHorizontal: 10, alignSelf: "center",
          justifyContent: "center",
        }}>
          <Text style={{ fontSize: 14, color: "#000" }}>Nome: {nome[0]}</Text>
          <Text style={{ fontSize: 14, color: "#000" }}>Tipo Doc: {nome[1]}</Text>
          <Text style={{ fontSize: 14, color: "#000" }}>Id Aluno: {nome[2]}</Text>
        </View>

      </TouchableOpacity>);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: 100, backgroundColor: "orange" }}>
        <View style={{ width: "100%", height: 100, backgroundColor: "orange", flexDirection: "column-reverse" }}>
          <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-between" }}>
            <TouchableOpacity style={{ width: "40%", justifyContent: "center", alignSelf: "center", alignItems: "center", flexDirection: "row" }}>
              <Image source={Logo} style={{ width: 40, height: 40, alignSelf: "center", borderRadius: 50 }} />
              <Text style={{ fontSize: 18, marginLeft: 5, color: "#000" }}>Inclus.com</Text>
            </TouchableOpacity>

            <Stack style={{ marginRight: "3%" }}>
              <Button
                title="Scan"
                color='white'
                style={{ alignItems: "center", borderRadius: 50, justifyContent: "center", top: 5, right: "25%", position: "absolute" }}
                leading={props => <Icon name="qrcode" {...props} />}
                onPress={() => navigateAndReset()} />

            </Stack>
          </View>
        </View>
      </View>
      <View style={{ width: "100%", height: "100%" }}>
        {getFiles.length > 0 ? (
          <View style={{ flex: 0.9, width: "100%", alignSelf: "center", justifyContent: 'center', alignItems: "center", backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 16, color: "white", alignSelf: "flex-start", marginLeft: 10 }}>Arquivos Selecionados: {getFiles.length}</Text>
            <FlatList style={{ width: "90%" }} data={getFiles} keyExtractor={(item) => item.id} renderItem={renderFileItem} numColumns={columns} />
          </View>
        ) : (
          <View>

            <Text style={{ width: 320, height: 220, marginTop: "50%", color: "#7C7C8A", alignSelf: "center", justifyContent: "center", textAlign: "center" }}>Você não possui Arquivos Selecionados, Pressione o Botão "+" no topo para adicionar!</Text>
          </View>
        )}
      </View>

      {data.visible ? <Provider>
        <Dialog visible={data.visible} onDismiss={() => setData({ visible: false, header: "", content: "" })}>
          <DialogHeader title={data.header} />
          <DialogContent>
            <Text>{data.content}</Text>
          </DialogContent>
          <DialogActions>
            {
              data.header === "Sucess!" ? (
                <Button
                  title="Ok"
                  compact
                  titleStyle={{ color: "#3C3CFC" }}
                  variant="text"
                  onPress={() => Clear()}
                />
              ) : (
                <Button
                  title="Ok"
                  compact
                  titleStyle={{ color: "#3C3CFC" }}
                  variant="text"
                  onPress={() => setData({ visible: false, header: "", content: "" })}
                />
              )
            }

          </DialogActions>
        </Dialog>
      </Provider> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});