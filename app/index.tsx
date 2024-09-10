import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToList = () => {
    navigation.navigate('list');
  };

  const navigateToRegister = () => {
    navigation.navigate('register');
  };

  const navigateToTammagotchi = (id: number) => {
    navigation.navigate('tamagotchi', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo ao Tamagotchi App!</Text>
      <Button title="Ver Tamagotchis" onPress={navigateToList} />
      <Button title="Cadastrar Tamagotchi" onPress={navigateToRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 16,
  },
});
