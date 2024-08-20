import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Svg, { Circle, Line, Path } from 'react-native-svg';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e3eeff',
    },
    text: {
        marginVertical: 5,
        fontSize: 18,
        color: "#000"
    },
    statusText: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
});



export default function Status() {
    const [hunger, setHunger] = useState(70);
    const [sleep, setSleep] = useState(70);
    const [happy, setHappy] = useState(70);


    useEffect(() => {
        const timer = setInterval(() => {
            setHunger(prev => Math.max(0, Math.min(100, prev - 5)));
            setHappy(prev => Math.max(0, Math.min(100, prev - 5)));
            setSleep(prev => Math.max(0, Math.min(100, prev - 5)));
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const getFaceExpression = (value: number) => {
        if (value >= 70) {
            return 'smile';
        } else if (value >= 40) {
            return 'neutral';
        } else {
            return 'sad';
        }
    };

    const calculateStatus = () => {
        const statusTotal = hunger + sleep + happy;
        if (statusTotal === 0) return "Morto x-x";
        if (statusTotal <= 50) return "Crítico o_o";
        if (statusTotal <= 100) return "Muito triste :'(";
        if (statusTotal <= 150) return "Triste :(";
        if (statusTotal <= 200) return "Ok :I";
        if (statusTotal > 200) return "Bem! :)";
    }

    const renderFace = (expression: string) => {
        switch (expression) {
            case "smile":
                return (
                    <>
                        <Circle cx='35' cy='40' r='5' fill='black' />
                        <Circle cx='65' cy="40" r="5" fill='black' />
                        <Path d="M35 60 Q50 75, 65 60"
                            stroke='black'
                            strokeWidth='2.5'
                            fill='none' />
                    </>
                );
            case 'neutral':
                return (
                    <>
                        <Circle cx='35' cy='40' r='5' fill='black' />
                        <Circle cx='65' cy="40" r="5" fill='black' />
                        <Line x1='35' y1='60'
                            x2='65' y2='60'
                            stroke="black" strokeWidth='2.5'
                        />
                    </>
                );
            case 'sad':
                return (
                    <>
                        <Circle cx='35' cy='40' r='5' fill='black' />
                        <Circle cx='65' cy="40" r="5" fill='black' />
                        <Path d="M35 60 Q50 45, 65 60"
                            stroke='black'
                            strokeWidth='2.5'
                            fill='none' />
                    </>
                )
        }
    }

    const faceExpression = getFaceExpression(happy);

    return (
        <View style={styles.container}>
            <Svg height='100' width='100' viewBox="0 0 100 100">
                <Circle cx="50" cy='50' r='45' stroke='black'
                    strokeWidth='2.5' fill='yellow' />
                {renderFace(faceExpression)}
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

            <Text style={styles.statusText}>Status: {calculateStatus()}</Text>

            <Button title="Alimentar" onPress={() =>
                setHunger(
                    prev => Math.max(0, Math.min(100, prev + 10)))
            } />
            <Button title="Brincar" onPress={() =>
                setHappy(
                    prev => Math.max(0, Math.min(
                        100, prev + 10)))
            } />
            <Button title="Dormir" onPress={() =>
                setSleep(
                    prev => Math.max(0, Math.min(100, prev + 10)))
            } />
        </View>
    );
}
;

