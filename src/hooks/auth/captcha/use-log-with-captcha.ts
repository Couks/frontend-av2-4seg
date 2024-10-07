import { useState } from "react";

const useLoginWithCaptcha = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginWithCaptcha = async (
    email: string,
    senha: string,
    captchaCode: string
  ) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/captcha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha, captcha: captchaCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao validar CAPTCHA.");
        return false;
      }

      return true; // Login bem-sucedido
    } catch (err) {
      console.error("Erro ao validar CAPTCHA:", err);
      setError("Erro de rede. Tente novamente mais tarde.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loginWithCaptcha, loading, error };
};

export default useLoginWithCaptcha;
