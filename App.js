import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import Routes from "./src/routes/index.js"
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
