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
import {
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/service/api.service";

interface SignupFormData {
  nome: string;
  email: string;
  senha: string;
}

interface PasswordChecks {
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  noInsecureChars: boolean;
  atLeast8Chars: boolean;
}

const initialPasswordChecks: PasswordChecks = {
  hasNumber: false,
  hasSpecialChar: false,
  hasUpperCase: false,
  hasLowerCase: false,
  noInsecureChars: true,
  atLeast8Chars: false,
};

const validatePassword = (password: string): PasswordChecks => ({
  hasNumber: /\d/.test(password),
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  hasUpperCase: /[A-Z]/.test(password),
  hasLowerCase: /[a-z]/.test(password),
  noInsecureChars: !/['"`]/.test(password),
  atLeast8Chars: password.length >= 8,
});

const validateField = (name: string, value: string): string => {
  switch (name) {
    case "nome":
      return value.trim().length < 2
        ? "Nome deve ter ao menos dois caracteres"
        : "";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Email inválido";
    case "senha":
      return value.trim().length < 8
        ? "A senha deve ter pelo menos 8 caracteres"
        : "";
    default:
      return "";
  }
};

interface FormErrors {
  [key: string]: string;
}

const useSignupController = () => {
  const initialFormData: SignupFormData = {
    nome: "",
    email: "",
    senha: "",
  };
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>(
    initialPasswordChecks
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateAndSetErrors(name, value);
  };

  const validateAndSetErrors = (name: string, value: string) => {
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "senha") {
      const checks = validatePassword(value);
      setPasswordChecks(checks);
      const isValid = Object.values(checks).every(Boolean);
      setErrors((prev) => ({
        ...prev,
        senha: isValid ? "" : "Sua senha não atende aos critérios de segurança",
      }));

      if (isValid) {
        setShowPasswordValidation(true);
      } else {
        setShowPasswordValidation(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formErrors: Record<string, string> = {};
    for (const key in formData) {
      const error = validateField(key, formData[key as keyof SignupFormData]);
      if (error) {
        formErrors[key] = error;
      }
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return false;
    }

    try {
      await api.user.register({
        name: formData.nome,
        email: formData.email,
        password: formData.senha,
      });
      return true;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Erro ao criar conta. Por favor, tente novamente.",
      }));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    passwordChecks,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    showPasswordValidation,
    loading,
  };
};

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
    loading,
  } = useSignupController();

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    const result = await handleSubmit(e);
    if (result) {
      router.push(
        `/login/verify-email?email=${encodeURIComponent(formData.email)}`
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-8">
      <Card className="w-full max-w-xl mx-auto shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <UserPlus size={48} className="text-primary animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Cadastro</CardTitle>
            <CardDescription className="text-lg mt-2">
              Crie sua conta e comece a jornada
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <div className="relative">
                <UserPlus
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors["nome"] && (
                <AlertDescription className="text-red-500 text-sm">
                  {errors["nome"]}
                </AlertDescription>
              )}
            </div>

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

            {/* Verificação da senha */}
            {showPasswordValidation ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle2
                    className="text-green-500 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-green-700 text-sm font-medium">
                    Parabéns! Sua senha atende os critérios de segurança
                  </span>
                </div>
              </div>
            ) : (
              formData.senha && (
                <div className="bg-card/50 border rounded-lg p-4 space-y-2 shadow-sm">
                  <h4 className="font-medium text-sm mb-2">
                    Requisitos da senha:
                  </h4>
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
                    isValid={passwordChecks.atLeast8Chars}
                    text="Ter ao menos 8 caracteres"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.noInsecureChars}
                    text="Não conter caracteres inseguros"
                  />
                </div>
              )
            )}

            {/* Erro geral */}
            {errors["submit"] && (
              <AlertDescription className="text-red-500 text-center">
                {errors["submit"]}
              </AlertDescription>
            )}

            {/* Botão de Envio */}
            {showPasswordValidation && (
              <Button
                type="submit"
                className="w-full text-lg py-6 transition-all duration-200 hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <span className="text-muted-foreground">
            Já tem uma conta?{" "}
            <Link
              href="/login/signin"
              className="text-primary font-semibold hover:underline transition-colors"
            >
              Faça login
            </Link>
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
