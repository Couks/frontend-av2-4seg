"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para o login após 5 segundos
    const timer = setTimeout(() => {
      router.push("/login/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen p-8 bg-background">
      <Card className="w-full max-w-xl mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-500">
            Conta Verificada com Sucesso!
          </CardTitle>
          <CardDescription>
            Você será redirecionado para a página de login em instantes...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            <p>Obrigado por verificar sua conta.</p>
            <p>Por favor, faça login para acessar a plataforma.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
