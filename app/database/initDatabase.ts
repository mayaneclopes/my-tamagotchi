
import { SQLiteDatabase } from 'expo-sqlite';
import { addImageColumn } from './addImageTable';

export async function initDatabase(database: SQLiteDatabase): Promise<void> {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Tamagotchi (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT
        );
    `);

    await addImageColumn(database);
}
