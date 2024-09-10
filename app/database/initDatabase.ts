import { SQLiteDatabase } from 'expo-sqlite';

export async function initDatabase(database: SQLiteDatabase): Promise<void> {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Tamagotchi (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT
        );
    `);

    const result = await database.getAllAsync(`
        PRAGMA table_info(Tamagotchi);
    `);

    const hasImageColumn = result.some((col: any) => col.name === 'image');

    if (!hasImageColumn) {
        await database.execAsync(`
            ALTER TABLE Tamagotchi ADD COLUMN image TEXT;
        `);
    }
}
