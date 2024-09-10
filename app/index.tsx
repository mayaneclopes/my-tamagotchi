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
    navigation.navigate('tamagotchi', { tamagotchiID: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo ao Tamagotchi App!</Text>
      <View style={styles.buttonContainer}>
        <Button
          color='#cd49ec'
          title="Ver Tamagotchis" onPress={navigateToList} />
        <Button
          color='#cd49ec'
          title="Cadastrar Tamagotchi" onPress={navigateToRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDBDE5',
    padding: 16,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 16,
  }
});
