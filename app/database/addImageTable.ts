import { SQLiteDatabase } from 'expo-sqlite';

export async function addImageColumn(database: SQLiteDatabase): Promise<void> {
    await database.execAsync(`
        ALTER TABLE Tamagotchi ADD COLUMN image TEXT;
    `);
}