import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Abre ou cria o banco de dados
const dbPromise = open({
  filename: "./mydatabase.db",
  driver: sqlite3.Database,
});

// Cria a tabela de usuários
const createUsersTable = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      sobrenome TEXT NOT NULL,
      usuario TEXT NOT NULL UNIQUE,
      telefone TEXT NOT NULL,
      hashedPassword TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Chama a função para criar a tabela
createUsersTable().catch(console.error);

export default dbPromise;
