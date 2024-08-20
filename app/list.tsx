import { View, Text, StyleSheet } from "react-native";

export default function List() {

    return (
        <View style={styles.container}>
            <Text>Seus Tamagotchis</Text>
            { }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
