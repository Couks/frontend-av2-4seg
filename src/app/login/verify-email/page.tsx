"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import { Shield, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.user.verifyEmail(code, email);
      router.push("/login/success");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao verificar email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-background">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Verificação de Email
          </CardTitle>
          <CardDescription className="text-muted-foreground flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            Digite o código de 6 dígitos enviado para seu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-8">
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="text-center text-3xl font-semibold tracking-[1em] w-64 h-16 bg-background"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="000000"
                required
              />
              {error && (
                <AlertDescription className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </AlertDescription>
              )}
              <Button
                type="submit"
                className="w-full max-w-xs text-base py-6"
                disabled={loading || code.length !== 6}
              >
                {loading ? (
                  "Verificando..."
                ) : (
                  <>
                    Verificar Email
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