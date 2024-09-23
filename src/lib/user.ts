// import dbPromise from "@/lib/database/database";
// import { hashPassword } from "./auth"; // Supondo que você tenha uma função para hash de senha

// export const createUser = async (
//   nome: string,
//   sobrenome: string,
//   usuario: string,
//   telefone: string,
//   password: string
// ) => {
//   const db = await dbPromise;
//   const hashedPassword = hashPassword(password);

//   const stmt = await db.prepare(
//     "INSERT INTO users (nome, sobrenome, usuario, telefone, hashedPassword) VALUES (?, ?, ?, ?, ?)"
//   );
//   await stmt.run(nome, sobrenome, usuario, telefone, hashedPassword);
//   await stmt.finalize();
// };

// export const findUserByUsername = async (usuario: string) => {
//   const db = await dbPromise;
//   const stmt = await db.prepare("SELECT * FROM users WHERE usuario = ?");
//   const user = await stmt.get(usuario);
//   await stmt.finalize();
//   return user;
// };
