import * as SecureStore from 'expo-secure-store';

const saveValue = async (value) => {
  try {
    
    let data = value.toString();
    await SecureStore.setItemAsync("data",data);
  } catch (error) {
   alert(`Erro ao armazenar o valor:\n${error.toString()}`);
   return false
  }
};


export {saveValue}