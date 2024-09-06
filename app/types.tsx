import { NavigatorScreenParams } from '@react-navigation/native';
export type RootStackParamList = {
    index: undefined;
    '+not-found': undefined;
    register: undefined;
    list: undefined;
    tamagotchi: { id: number };
};

export interface Tamagotchi {
    id: number;
    name: string;
    image?: string;
}
