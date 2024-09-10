import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Button, Alert } from 'react-native';
import { useTamagotchiDatabase } from './database/tamagotchiService';
import { FlatList } from 'react-native';
import { Tamagotchi } from './types';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'tamagotchi'>;

export default function List() {
    const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
    const { getTamagotchi, deleteTamagotchi } = useTamagotchiDatabase();
    const navigation = useNavigation<ListScreenNavigationProp>();

    const loadTamagotchis = async () => {
        try {
            const data: Tamagotchi[] = await getTamagotchi();
            setTamagotchis(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadTamagotchis();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadTamagotchis();
        }, [])
    );

    const handlePress = (id: number) => {
        navigation.navigate('tamagotchi', { tamagotchiID: id });
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTamagotchi(id);
            setTamagotchis(tamagotchis.filter(item => item.id !== id));
            Alert.alert("Pronto!", "Você excluiu este bichinho :(");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível deletar seu bichinho.");
            console.error(error);
        }
    };

    const renderItem = ({ item }: { item: Tamagotchi }) => (
        <View style={styles.item}>
            <Pressable onPress={() => handlePress(item.id)}>
                <Text style={styles.name}>{item.name}</Text>
            </Pressable>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Button title="Deletar" onPress={() => handleDelete(item.id)} color="red" />
        </View>
    );

    const getKey = (item: Tamagotchi) => item.id.toString();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Seus Tamagotchis</Text>
            <FlatList<Tamagotchi>
                data={tamagotchis}
                renderItem={renderItem}
                keyExtractor={getKey}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDBDE0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 8,
        width: '100%',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        color: '#9d1cbb',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 8,
    },
});
