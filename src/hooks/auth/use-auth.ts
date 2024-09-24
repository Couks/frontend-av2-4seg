import { useState } from "react";
import { useRouter } from "next/router"; // Importe useRouter

export const useAuth = () => {
  const [error, setError] = useState("");
  const router = useRouter(); // Inicialize useRouter

  const login = async (email: string, password: string) => {
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return null; // Retorne null se os campos não estiverem preenchidos
    }

    console.log("Tentativa de login com:", { email, password });

    try {
      const response = await fetch(
        "http://localhost:3001/security/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Resposta do servidor:", response);

      if (!response.ok) {
        // Tente obter detalhes do erro da resposta
        const errorData = await response.json();
        console.error("Erro no servidor:", errorData);

        switch (response.status) {
          case 400:
            setError("Credenciais inválidas. Verifique seu e-mail e senha.");
            break;
          case 401:
            setError("Acesso não autorizado. Verifique suas credenciais.");
            break;
          case 500:
            setError("Erro interno do servidor. Tente novamente mais tarde.");
            break;
          default:
            setError("Falha ao realizar login. Tente novamente.");
            break;
        }
        return null;
      }

      const data = await response.json();
      const token = data.access_token;

      if (!token) {
        setError("Erro ao recuperar o token. Tente novamente.");
        return null;
      }

      localStorage.setItem("token", token);
      router.push("/dashboard");
      return { token };
    } catch (err: any) {
      console.error("Erro ao realizar login:", err);
      setError(
        "Erro de rede. Verifique sua conexão ou tente novamente mais tarde."
      );
      return null;
    }
  };

  return { login, error };
};
