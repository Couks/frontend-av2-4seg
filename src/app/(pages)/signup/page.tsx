"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function SignupComponent() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    usuario: "",
    telefone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordChecks, setPasswordChecks] = useState({
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    hasLowerCase: false,
    noInsecureChars: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "telefone") {
      // Formatação do número de telefone brasileiro
      const formattedPhone = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");
      setFormData((prev) => ({ ...prev, telefone: formattedPhone }));
    } else {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "nome":
      case "sobrenome":
        if (value.trim().length < 2)
          error = `${name} deve ter ao menos dois caracteres`;
        break;
      case "usuario":
        if (value.trim().length < 3)
          error = "Usuário deve ao menos 3 caracteres";
        break;
      case "telefone":
        if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(value))
          error = "Número de telefone inválido";
        break;
      case "password":
        validatePassword(value);
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validatePassword = (password: string) => {
    const checks = {
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      noInsecureChars: !/['"`]/.test(password),
    };
    setPasswordChecks(checks);

    const isValid = Object.values(checks).every(Boolean);
    setErrors((prev) => ({
      ...prev,
      password: isValid ? "" : "Password does not meet all requirements",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = Object.entries(formData).reduce((acc, [key, value]) => {
      validateField(key, value);
      return { ...acc, [key]: errors[key] || "" };
    }, {});

    if (Object.values(formErrors).some(Boolean)) {
      setErrors(formErrors);
      return;
    }

    // Aqui você faria a chamada à API para registrar o usuário
    console.log("Signup attempted with:", formData);
    alert("Signup successful!");
  };

  const PasswordCheckItem = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div className="flex items-center space-x-2">
      {isValid ? (
        <CheckCircle2 className="text-green-500" size={16} />
      ) : (
        <XCircle className="text-red-500" size={16} />
      )}
      <span className={isValid ? "text-green-500" : "text-red-500"}>
        {text}
      </span>
    </div>
  );

  return (
    <main className="flex items-center justify-center h-screen bg-black">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>Crie sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite seu nome"
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

              <div>
                <Label htmlFor="sobrenome">Sobrenome</Label>
                <Input
                  id="sobrenome"
                  name="sobrenome"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  required
                />
                {errors["sobrenome"] && (
                  <AlertDescription className="text-red-500">
                    {errors["sobrenome"]}
                  </AlertDescription>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usuario">Usuário</Label>
              <Input
                id="usuario"
                name="usuario"
                type="text"
                placeholder="Digite seu usuário"
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

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                type="text"
                placeholder="(XX) XXXXX-XXXX"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
              {errors["telefone"] && (
                <AlertDescription className="text-red-500">
                  {errors["telefone"]}
                </AlertDescription>
              )}
            </div>

            <div className="relative space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2/3 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors["password"] && (
                <AlertDescription className="text-red-500">
                  {errors["password"]}
                </AlertDescription>
              )}
            </div>

            {formData.password && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Requisitos da senha:</h4>
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
              </div>
            )}

            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
