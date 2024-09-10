import { SQLiteDatabase } from 'expo-sqlite';

export async function initDatabase(database: SQLiteDatabase): Promise<void> {
    try {
        // Criar a nova tabela
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS Tamagotchi_new (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                image TEXT
            );
        `);

        // Migrar os dados
        await database.execAsync(`
            INSERT INTO Tamagotchi_new (id, name, image)
            SELECT id, name, image FROM Tamagotchi;
        `);

        // Remover a tabela antiga
        await database.execAsync(`
            DROP TABLE IF EXISTS Tamagotchi;
        `);

        // Renomear a nova tabela
        await database.execAsync(`
            ALTER TABLE Tamagotchi_new RENAME TO Tamagotchi;
        `);

        console.log("Banco de dados inicializado com sucesso.");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
        throw error;
    }
}
