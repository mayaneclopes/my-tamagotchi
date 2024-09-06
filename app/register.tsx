import { useState } from "react";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { Button, StyleSheet, Text, TextInput, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "./types";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'register'>;

export default function Register() {
    const [name, setName] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { createTamagotchi } = useTamagotchiDatabase();

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
        imageOptions: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 16,
        },
        imageOption: {
            width: 100,
            height: 100,
            margin: 10,
        },
        selectedImage: {
            width: 100,
            height: 100,
            marginBottom: 16,
        }
    });

    const handleRegister = async () => {
        if (name && selectedImage) {
            try {
                await createTamagotchi({ name, image: selectedImage });
                navigation.navigate('list');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nome do Tamagotchi:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite o nome"
            />
            <Text style={styles.text}>Escolha uma imagem:</Text>
            <View style={styles.imageOptions}>
                <Pressable onPress={() => setSelectedImage('https://i.namu.wiki/i/hZVLSz2rFDGF2iz4kxBRijmthf9hNebwuQl8YCdCHkmtnyQNxTHQLkJid7kU52soPu5qmQ5nBAzPU99z5gUCCQ.webp')}>
                    <Image
                        source={{ uri: 'https://i.namu.wiki/i/hZVLSz2rFDGF2iz4kxBRijmthf9hNebwuQl8YCdCHkmtnyQNxTHQLkJid7kU52soPu5qmQ5nBAzPU99z5gUCCQ.webp' }}
                        style={styles.imageOption}
                    />
                </Pressable>
                <Pressable onPress={() => setSelectedImage('https://static.wikia.nocookie.net/tamagotchi/images/1/17/SmartotchiModern.png/revision/latest?cb=20200908051435')}>
                    <Image
                        source={{ uri: 'https://static.wikia.nocookie.net/tamagotchi/images/1/17/SmartotchiModern.png/revision/latest?cb=20200908051435' }}
                        style={styles.imageOption}
                    />
                </Pressable>
            </View>
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            )}
            <Button title="Cadastrar" onPress={handleRegister} />
        </View>
    );
}
