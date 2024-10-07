"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import useCaptchaValidation from "@/hooks/auth/captcha/use-captcha-validation";
import useLoginWithCaptcha from "@/hooks/auth/captcha/use-log-with-captcha";

type CaptchaComponentProps = {
  isLogin?: boolean;
  email?: string;
  senha?: string;
};

export default function CaptchaComponent({
  isLogin = false,
  email = "",
  senha = "",
}: CaptchaComponentProps) {
  const [captchaCode, setCaptchaCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { validateCaptcha } = useCaptchaValidation();
  const { loginWithCaptcha } = useLoginWithCaptcha();

  const handleCaptchaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (captchaCode.length !== 6) {
      setError("O código CAPTCHA deve conter 6 dígitos.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const response = await loginWithCaptcha(email, senha, captchaCode);
        if (response) {
          router.push("/login/signin");
        } else {
          setError("Erro ao validar CAPTCHA durante o login.");
        }
      } else {
        const response = await validateCaptcha(captchaCode);
        if (response) {
          router.push("/login/signin");
        } else {
          setError("Erro ao validar CAPTCHA durante o cadastro.");
        }
      }
    } catch (err) {
      console.error("Erro ao enviar o CAPTCHA:", err);
      setError("Erro de rede. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen p-8 bg-black">
      <Card className="w-full max-w-xl mx-auto text-center">
        <CardHeader>
          <CardTitle>Validação do CAPTCHA</CardTitle>
          <CardDescription>
            Insira o código de 6 dígitos enviado por e-mail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCaptchaSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="captcha"
                name="captcha"
                type="text"
                maxLength={6}
                className="text-blue-600 text-center text-2xl font-bold tracking-[20px] pr-0"
                value={captchaCode}
                onChange={(e) => setCaptchaCode(e.target.value)}
                required
              />
              {error && (
                <AlertDescription className="text-red-500">
                  {error}
                </AlertDescription>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Validando..." : "Validar Código"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Não recebeu o código?{" "}
            <a href="#" className="text-primary hover:underline">
              Reenviar código
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
