import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Alert, Text, Button } from "react-native";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { useNavigation } from '@react-navigation/native';

interface TicTacToeProps {
    tamagotchiID: number;
}

const TicTacToe = ({ tamagotchiID }: TicTacToeProps) => {
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const { updateAttributes } = useTamagotchiDatabase();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        cell: {
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: 'center',
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: 'white',
        },
        board: {
            width: 300,
            flexWrap: 'wrap',
            flexDirection: 'row',
        },
        button: {
            marginTop: 20,
        },
        text: {
            fontSize: 34,
        },
        statusText: {
            marginVertical: 20,
            fontSize: 24,
        }
    });

    useEffect(() => {
        const checkWinner = (board: string[]) => {
            const winnerCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let combo of winnerCombinations) {
                const [a, b, c] = combo;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    setWinner(board[a]);
                    return board[a];
                }
            }

            if (board.every((cell) => cell !== '')) {
                setWinner("Draw");
            }
            return null;
        }

        checkWinner(board);
    }, [board]);

    const handleCellPress = (index: number) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        setIsPlayerTurn(false);
    };

    const machineMove = () => {
        const emptyCells = board.map((cell, index) => (cell === '' ? index : null))
            .filter((index): index is number => index !== null);

        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const newBoard = [...board];
            newBoard[randomIndex] = 'O';
            setBoard(newBoard);
            setIsPlayerTurn(true);
        }
    };

    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const timer = setTimeout(() => {
                machineMove();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, winner]);

    const handleNewGame = async () => {
        setBoard(Array(9).fill(''));
        setWinner(null);
        setIsPlayerTurn(true);

        try {
            console.log("Atualizando atributos do Tamagotchi:", tamagotchiID, { happy: 100 });
            await updateAttributes(tamagotchiID, {
                happy: 100
            });
            Alert.alert("Parabéns!", "Você deixou seu bichinho muito contente!");
        } catch (error) {
            console.error("Erro ao atualizar atributos:", error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.statusText}>
                {winner ? (winner === 'Draw' ? "Deu empate!" : `Vencedor: ${winner}`) :
                    `Vez de jogar: ${isPlayerTurn ? 'Jogador' : 'Máquina'}`}
            </Text>
            <View style={styles.board}>
                {board.map((cell, index) => (
                    <Pressable key={index} style={styles.cell} onPress={() => handleCellPress(index)}>
                        <Text style={styles.text}>{cell}</Text>
                    </Pressable>
                ))}
            </View>
            {winner && (
                <View style={styles.button}>
                    <Button title="Novo Jogo" onPress={handleNewGame} />
                    <Button title="Voltar" onPress={() => navigation.goBack()} style={styles.button} />
                </View>
            )}
        </View>
    );
}

export default TicTacToe;
