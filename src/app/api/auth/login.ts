import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser, hashPassword } from "@/lib/auth";
import { generateCaptcha } from "@/lib/captcha";
import { logAction } from "@/lib/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const hashedPassword = hashPassword(password);
    const user = await authenticateUser(username, hashedPassword);

    if (!user) {
      const captcha = generateCaptcha();
      await logAction("Failed login attempt", username);
      return res
        .status(401)
        .json({ error: "Usuário ou senha incorretos", captcha });
    }

    // Envio do código de autenticação aqui

    return res.status(200).json({ message: "Login bem-sucedido" });
  }

  return res.status(405).json({ error: "Método não permitido" });
}
