import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTamagotchiDatabase } from "./database/tamagotchiService";
import { Alert } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native";


interface TicTacToeProps {
    tamagotchiID: number;
}

const TicTacToe = ({ tamagotchiID }: TicTacToeProps) => {
    const [board, setBoard] = useState<string[]>(Array(9).fill(''));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const { updateAttributes } = useTamagotchiDatabase();

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
    })

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
                setWinner("Draw")
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
        const emptyCells = board.map((
            cell, index) => (cell === '' ? index : null)
        ).filter((index) => index !== null);

        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(
                Math.random() * emptyCells.length
            )] as number;
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
            await updateAttributes(tamagotchiID, { happy: 100 });
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
                    <View key={index} style={styles.cell}>
                        <Text style={styles.text}
                            onPress={() => handleCellPress(index)}>
                            {cell}
                        </Text>
                    </View>
                ))}
            </View>
            {winner && (
                <View style={styles.button}>
                    <Button title="Novo Jogo" onPress={handleNewGame} />
                </View>
            )}
        </View>
    );
}

export default TicTacToe;