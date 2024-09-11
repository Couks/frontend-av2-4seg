import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 text-white font-sans">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bem-vindo ao Security Web App
        </h1>
        <p className="text-lg text-center max-w-md">
          O Security Web App foi criado para garantir sua segurança com login de
          dois fatores. Escolha uma das opções abaixo para continuar:
        </p>
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <Button variant="outline">Fazer Login</Button>
          </Link>

          <Link href="/signup">
            <Button variant="secondary">Cadastrar</Button>
          </Link>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-4 py-4 mt-16">
        <p className="text-sm text-center">
          Projeto desenvolvido para a disciplina de Segurança da Informação -
          FAETERJ-Rio.
        </p>
        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()} Security Web App. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
