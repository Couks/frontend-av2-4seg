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

export default function SignupSuccessComponent() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CheckCircle2 className="text-green-500 mx-auto mb-4" size={48} />
          <CardTitle>Cadastro realizado com sucesso!</CardTitle>
          <CardDescription>
            Você será redirecionado para a página de login em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Obrigado por se cadastrar. Aproveite nossa plataforma!</p>
        </CardContent>
      </Card>
    </main>
  );
}
