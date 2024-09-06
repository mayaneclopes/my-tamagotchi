import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTamagotchiDatabase } from './database/tamagotchiService';
import { FlatList } from 'react-native';
import { Tamagotchi } from './types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'list'>;

export default function List() {
    const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
    const { getTamagotchi } = useTamagotchiDatabase();
    const navigation = useNavigation<ListScreenNavigationProp>();

    useEffect(() => {
        const listTamagotchis = async () => {
            try {
                const data: Tamagotchi[] = await getTamagotchi();
                setTamagotchis(data);
            } catch (error) {
                console.error(error);
            }
        };

        listTamagotchis();
    }, []);

    const handlePress = (id: number) => {
        navigation.navigate('tamagotchi', { id });
    };

    const renderItem = ({ item }: { item: Tamagotchi }) => (
        <View style={styles.item}>
            <Pressable onPress={() => handlePress(item.id)}>
                <Text style={styles.name}>{item.name}</Text>
            </Pressable>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
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
    },
    header: {
        fontSize: 24,
    },
    item: {
        padding: 16,
        marginBottom: 8,
        borderColor: '#cc7',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        color: 'blue',
        backgroudColor: 'black'
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 8,
    },
});
