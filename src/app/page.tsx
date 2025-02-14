import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Lock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex max-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-10 w-10 text-primary animate-pulse bg-gray-200 rounded-full p-1" />
            <h1 className="text-center text-4xl font-bold text-primary py-2">
              Security Web App
            </h1>
          </div>
          <p className="max-w-[42rem] text-center text-muted-foreground sm:text-xl">
            Uma plataforma moderna e segura com autenticação de dois fatores
            para proteger seus dados.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 max-w-3xl">
          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-lg">
            <Lock className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-semibold">Já tem uma conta?</h2>
            <p className="text-center text-muted-foreground">
              Acesse sua conta de forma segura com autenticação de dois fatores
            </p>
            <Link href="/login/signin" className="w-full">
              <Button className="w-full group" variant="default">
                Fazer Login
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-lg">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-semibold">Novo por aqui?</h2>
            <p className="text-center text-muted-foreground">
              Crie sua conta e aproveite todos os recursos de segurança
            </p>
            <Link href="/login/signup" className="w-full">
              <Button className="w-full group" variant="secondary">
                Cadastrar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full border-t bg-card/50 py-6">
        <div className="container flex flex-col items-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            Projeto desenvolvido para a disciplina de Segurança da Informação -
            FAETERJ-Rio
          </p>
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Security Web App. Todos os
            direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
