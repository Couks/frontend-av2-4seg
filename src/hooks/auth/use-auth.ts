import { useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (email: string, senha: string) => {
    setError("");

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos");
      return null;
    }

    console.log("Tentativa de login com:", {
      email,
      senha: typeof senha,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        }
      );

      console.log("Resposta do servidor:", response);

      if (!response.ok) {
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
    } catch (err) {
      console.error("Erro ao realizar login:", err);
      setError(
        "Erro de rede. Verifique sua conexão ou tente novamente mais tarde."
      );
      return null;
    }
  };

  return { login, error };
};
