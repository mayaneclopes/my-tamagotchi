import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "@/database/Database";
import Smile from "@/database/Model";
import list from "./list";

export default function register() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
        },
        text: {
            fontSize: 18,
            marginBottom: 8,
        },
        input: {
            borderColor: '#cce',
            borderWidth: 1,
            marginBottom: 16,
            padding: 8,
            fontSize: 16,
        },
    });

    const handleRegister = async () => {
        if (!name || !image) {
            Alert.alert("Preencha todos os campos!");
            return;
        }
        try {
            await database.write(async () => {
                await database.collections.get<Smile>('smiles').create(smile => {
                    smile.name = name;
                    smile.image = image;
                    smile.hunger = 70;
                    smile.sleep = 70;
                    smile.happy = 70;
                });
            });
            Alert.alert("Tamagotchi criado com sucesso!");
        } catch (error) {
            console.error("Erro de cadastro:", error);
            Alert.alert("Erro no cadastro, tente novamente");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.text}>Imagem:</Text>
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage} />
            <Button
                title="Cadastrar"
                onPress={handleRegister}
            />
        </View>
    );
}
