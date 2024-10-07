"use client";

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
import { CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSignupController } from "./singup.controller";

export default function SignupComponent() {
  const {
    formData,
    errors,
    passwordChecks,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    showPasswordValidation,
  } = useSignupController();

  return (
    <main className="flex items-center justify-items-center h-screen p-8 bg-black">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>Crie sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div className="flex justify-between gap-4">
              <div className="w-full space-y-2">
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                {errors["nome"] && (
                  <AlertDescription className="text-red-500">
                    {errors["nome"]}
                  </AlertDescription>
                )}
              </div>

              {/* Usuário */}
              <div className="w-full space-y-2">
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  placeholder="Usuário"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                />
                {errors["usuario"] && (
                  <AlertDescription className="text-red-500">
                    {errors["usuario"]}
                  </AlertDescription>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors["email"] && (
                <AlertDescription className="text-red-500">
                  {errors["email"]}
                </AlertDescription>
              )}
            </div>

            {/* Senha */}
            <div className="relative space-y-2">
              <div className="relative w-full">
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors["senha"] && (
                <AlertDescription className="text-red-500">
                  {errors["senha"]}
                </AlertDescription>
              )}
            </div>

            {/* Verificação da senha */}
            {showPasswordValidation ? (
              <div className=" border-gray-50 border-2 p-2 shadow-md items-center">
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="text-green-500" size={16} />
                  <span className="text-green-500 text-sm">
                    Parabéns! Sua senha atende os critérios de segurança do
                    nosso app
                  </span>
                </div>
              </div>
            ) : (
              formData.senha && (
                <div className="space-y-1 border-gray-50 border-2 p-4 shadow-md">
                  <PasswordCheckItem
                    isValid={passwordChecks.hasNumber}
                    text="Conter ao menos um número"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.hasSpecialChar}
                    text="Conter ao menos um caracter especial"
                  />
                  <PasswordCheckItem
                    isValid={
                      passwordChecks.hasUpperCase && passwordChecks.hasLowerCase
                    }
                    text="Conter letras maiúsculas e minúsculas"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.noInsecureChars}
                    text="Não conter caracteres inseguros"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.atLeast8Chars}
                    text="Contém ao menos 8 caracteres"
                  />
                </div>
              )
            )}

            {/* Perfil */}
            <div className="space-y-2 text-sm text-gray-500">
              <select
                id="perfil"
                name="perfil"
                value={formData.perfil}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200/70 rounded-md p-2"
              >
                <option value="">Selecione um perfil</option>
                <option value="Aluno">Aluno</option>
                <option value="Professor">Professor</option>
              </select>
              {errors["perfil"] && (
                <AlertDescription className="text-red-500">
                  {errors["perfil"]}
                </AlertDescription>
              )}
            </div>

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login/signin" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

const PasswordCheckItem = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <div className="flex items-center space-x-1 text-sm">
    {isValid ? (
      <CheckCircle2 className="text-green-500" size={16} />
    ) : (
      <XCircle className="text-red-500" size={16} />
    )}
    <span className={isValid ? "text-green-500" : "text-red-500"}>{text}</span>
  </div>
);
