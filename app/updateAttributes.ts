// tamagotchiService.ts
import { useSQLiteContext } from "expo-sqlite";
import { Tamagotchi } from "./types";

export function useTamagotchiDatabase() {
    const database = useSQLiteContext();

    async function createTamagotchi({ name, image }: { name: string; image: string }) {
        const query = await database.prepareAsync(`
            INSERT INTO Tamagotchi (name, image, hunger, sleep, happy) VALUES
            ($name, $image, 70, 70, 70);
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

    async function updateAttributes(id: number, newAttributes: Partial<{ hunger: number; sleep: number; happy: number }>): Promise<void> {
        const { hunger, sleep, happy } = newAttributes;
        const query = await database.prepareAsync(`
            UPDATE Tamagotchi
            SET hunger = COALESCE($hunger, hunger),
                sleep = COALESCE($sleep, sleep),
                happy = COALESCE($happy, happy)
            WHERE id = $id;
        `);
        try {
            await query.executeAsync([hunger ?? null,
            sleep ?? null,
            happy ?? null, id]);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await query.finalizeAsync();
        }
    }

    return { createTamagotchi, getTamagotchi, updateAttributes };
}
