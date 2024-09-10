import { SQLiteDatabase } from 'expo-sqlite';

export async function addImageColumn(database: SQLiteDatabase): Promise<void> {
    await database.execAsync(`
        ALTER TABLE Tamagotchi ADD COLUMN image TEXT;
    `);
}

export async function updateTableSchema(database: SQLiteDatabase): Promise<void> {
    await database.execAsync(`
        ALTER TABLE Tamagotchi ADD COLUMN hunger INTEGER DEFAULT 70;
    `);
    await database.execAsync(`
        ALTER TABLE Tamagotchi ADD COLUMN sleep INTEGER DEFAULT 70;
    `);
    await database.execAsync(`
        ALTER TABLE Tamagotchi ADD COLUMN happy INTEGER DEFAULT 70;
    `);
}