import { useState } from "react";

const useCaptchaValidation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateCaptcha = async (captchaCode: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-email-captcha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ captcha: captchaCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao validar CAPTCHA.");
        return false;
      }

      return true;
    } catch (err) {
      console.error("Erro ao validar CAPTCHA:", err);
      setError("Erro de rede. Tente novamente mais tarde.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { validateCaptcha, loading, error };
};

export default useCaptchaValidation;
