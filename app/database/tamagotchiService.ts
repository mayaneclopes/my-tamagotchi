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
            console.error("Error creating Tamagotchi:", error);
            throw error;
        } finally {
            await query.finalizeAsync();
        }
    }

    async function getTamagotchi(): Promise<Tamagotchi[]> {
        try {
            const response = await database.getAllAsync<Tamagotchi>(`SELECT * FROM Tamagotchi;`);
            return response;
        } catch (error) {
            console.error("Error retrieving Tamagotchis:", error);
            throw error;
        }
    }

    async function deleteTamagotchi(id: number): Promise<void> {
        const query = await database.prepareAsync(`
            DELETE FROM Tamagotchi WHERE id = $id;
        `);
        try {
            await query.executeAsync({ $id: id });
            console.log(`Tamagotchi com ID ${id} excluído.`);
        } catch (error) {
            console.error("Erro ao excluir Tamagotchi:", error);
            throw error;
        } finally {
            await query.finalizeAsync();
        }
    }


    return { createTamagotchi, getTamagotchi, deleteTamagotchi };
}
