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
import { Eye, EyeOff, Shield, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const result = await login(formData.email, formData.senha);

      if (result.success) {
        router.replace("/dashboard");
      } else if (result.tempToken) {
        router.push(`/login/2fa?tempToken=${result.tempToken}`);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrors({
        submit: err.response?.data?.message || "Erro ao fazer login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-8">
      <Card className="w-full max-w-xl mx-auto shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Shield size={48} className="text-primary animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription className="text-lg mt-2">
              Acesse sua conta para continuar
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors["email"] && (
                <AlertDescription className="text-red-500 text-sm">
                  {errors["email"]}
                </AlertDescription>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors["senha"] && (
                <AlertDescription className="text-red-500 text-sm">
                  {errors["senha"]}
                </AlertDescription>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                href="/login/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            {/* Erro geral */}
            {errors["submit"] && (
              <AlertDescription className="text-red-500 text-center">
                {errors["submit"]}
              </AlertDescription>
            )}

            {/* Botão de Envio */}
            <Button
              type="submit"
              className="w-full text-lg py-6 transition-all duration-200 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <span className="text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              href="/login/signup"
              className="text-primary font-semibold hover:underline transition-colors"
            >
              Cadastre-se
            </Link>
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
