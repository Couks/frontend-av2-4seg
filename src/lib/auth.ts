import { createHash } from "crypto";

export const hashPassword = (password: string): string => {
  return createHash("sha256").update(password).digest("hex");
};

export const authenticateUser = async (
  username: string,
  hashedPassword: string
) => {
  // Lógica para buscar usuário no banco de dados e verificar senha
};
