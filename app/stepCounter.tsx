import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, View, Text, Button, StyleSheet } from 'react-native';
import { useTamagotchiDatabase } from './database/tamagotchiService';
import { useNavigation } from '@react-navigation/native';


interface Tamagotchi {
    id: number;
    name: string;
    image?: string;
    hunger: number;
    sleep: number;
    happy: number;
}

interface LocationCoordinate {
    latitude: number;
    longitude: number;
}

//Baseado no uso da fórmula de Haversine (usada em navegação, 
//GPs matemático) p/ encontrar a dist entre 2 pts
//em uma esfera, que encontrei no acervolima.com
//lat e long 1 => ponto 1, e 2 => ponto 2
const calculateDistance = (lat1: number, lon1: number,
    lat2: number, lon2: number): number => {
    const R = 6371e3; // Raio da Terra em metros
    //conversão em radianos para fçs sin e cos
    const param1 = lat1 * Math.PI / 180;
    const param2 = lat2 * Math.PI / 180;
    //calculo da diferença entre lat e long em radianos p/ calcular
    //a distância angular entre os pontos
    const param3 = (lat2 - lat1) * Math.PI / 180;
    const param4 = (lon2 - lon1) * Math.PI / 180;

    //cálculos da fórmula de Haversine em si
    const a = Math.sin(param3 / 2) * Math.sin(param3 / 2) +
        Math.cos(param1) * Math.cos(param2) *
        Math.sin(param4 / 2) * Math.sin(param4 / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // converção p/ metros
};

const stepCounter = ({ tamagotchiID }: { tamagotchiID: number }) => {
    const [location, setLocation] = useState<LocationCoordinate | null>(null);
    const [previousLocation, setPreviousLocation] = useState<LocationCoordinate | null>(null);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [steps, setSteps] = useState<number>(0);
    const [happy, setHappy] = useState<number>(70);
    const navigation = useNavigation();

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária para funcionamento do minigame');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getLocation();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (location && previousLocation) {
            const stepDistance = 0.7; //dá o cumprimento de 0,7m p/ cada passo
            const distance = calculateDistance( //dá a distância real
                previousLocation.latitude,
                previousLocation.longitude,
                location.latitude,
                location.longitude
            );
            setTotalDistance(prevDistance => prevDistance + distance + stepDistance);;
            setSteps(prevSteps => prevSteps + 1);
            setPreviousLocation(location);

            if (steps >= 5) {
                setHappy(100);
                Alert.alert("Parabéns!", "Você deu um passo em direção a saúde do seu bichinho!");
                setSteps(0); // Reset do game
            }
        } else if (location) {
            setPreviousLocation(location);
        }
    }, [location]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Distância total: {totalDistance.toFixed(2)} meters</Text>
            <Text style={styles.text}>Número de passos: {steps}</Text>
            <Button title="Voltar" onPress={() => navigation.goBack()} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default stepCounter;
