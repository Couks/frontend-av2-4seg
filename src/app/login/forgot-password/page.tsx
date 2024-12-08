"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";
import { api } from "@/service/api.service";
import { Shield, Mail, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.user.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao solicitar recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-background">
      <Card className="w-full max-w-xl mx-auto relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4"
          onClick={() => router.push("/login/signin")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
          <CardDescription className="text-muted-foreground flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            Digite seu email para receber as instruções
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-8">
              <Input
                type="email"
                className="w-full"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <AlertDescription className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </AlertDescription>
              )}
              {success && (
                <AlertDescription className="text-green-500 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Instruções enviadas para seu email
                </AlertDescription>
              )}
              <Button
                type="submit"
                className="w-full max-w-xs text-base py-6"
                disabled={loading}
              >
                {loading ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Instruções
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}