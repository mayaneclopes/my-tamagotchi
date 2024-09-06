import { useSQLiteContext } from "expo-sqlite";
import { Tamagotchi } from "../types";

export function useTamagotchiDatabase() {
    const database = useSQLiteContext();

    async function createTamagotchi({ name, image }: { name: string; image: string }) {
        const query = await database.prepareAsync(`
            INSERT INTO Tamagotchi (name, image) VALUES
            ($name, $image);
        `);
        try {
            await query.executeAsync({ $name: name, $image: image });
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await query.finalizeAsync();
        }
    }

    async function getTamagotchi(): Promise<Tamagotchi[]> {
        try {
            const response = await database.getAllAsync<Tamagotchi>(
                `SELECT * FROM Tamagotchi;`
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    return { createTamagotchi, getTamagotchi };
}
