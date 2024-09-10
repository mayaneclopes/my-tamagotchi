import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    index: undefined;
    '+not-found': undefined;
    register: undefined;
    list: undefined;
    tamagotchi: { tamagotchiID: number };
    TicTacToe: { tamagotchiID: number };
    stepCounter: { tamagotchiID: number };
};

export interface Tamagotchi {
    id: number;
    name: string;
    image?: string;
    hunger: number;
    sleep: number;
    happy: number;
}