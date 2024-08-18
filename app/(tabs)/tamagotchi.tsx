import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Svg, { Circle, Line } from 'react-native-svg';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFF",
    },
    text: {
        marginVertical: 5,
        fontSize: 18,
        color: "#000"
    },
});

export default function Status() {
    const [hunger, setHunger] = useState(70);
    const [sleep, setSleep] = useState(70);
    const [happy, setHappy] = useState(70);


    useEffect(() => {
        const timer = setInterval(() => {
            setHunger(prev => Math.max(0, prev - 5));
            setHappy(prev => Math.max(0, prev - 5));
            setSleep(prev => Math.max(0, prev - 10));
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const face = (value: number) => {

    }

    return (
        <View style={styles.container}>
            <Svg height='100' width='100' viewBox="0 0 100 100">
                <Circle cx="50" cy='50' r='45' stroke='black'
                    strokeWidth='2.5' fill='yellow' />
                <Circle cx='35' cy='40' r='5' fill='black' />
                <Circle cx='65' cy='40' r='5' fill='black' />
                <Line x1='35' y1='65' x2='65' y2='65' stroke="black" strokeWidth='2.5' />
            </Svg>

            <Text style={styles.text}>
                Fome: {hunger}
            </Text>
            <Text style={styles.text}>
                Descanso: {sleep}
            </Text>
            <Text style={styles.text}>
                Felicidade: {happy}
            </Text>

            <Button title="Alimentar" onPress={() =>
                setHunger(Math.max(0, hunger + 10))
            } />
            <Button title="Brincar" onPress={() =>
                setHappy(Math.min(100, happy + 10))
            } />
            <Button title="Dormir" onPress={() =>
                setSleep(Math.min(100, sleep + 20))
            } />
        </View>
    );
}
;

