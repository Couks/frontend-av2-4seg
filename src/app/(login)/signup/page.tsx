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
        ? "Name must have at least two characters"
        : "";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email";
    case "senha":
      return value.trim().length < 8
        ? "Password must have at least 8 characters"
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
        senha: isValid
          ? ""
          : "Your password does not meet the security criteria",
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
      console.error("Error registering user:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Error creating account. Please try again.",
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
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4 sm:p-8">
      <Card className="w-full max-w-xl mx-auto shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
            <UserPlus size={24} className="text-primary animate-pulse" />
          </div>
          <div>
            <CardDescription className="text-lg">
              Create your account and start your journey
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
                  placeholder="Full name"
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
                  placeholder="Email"
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
                  placeholder="Enter your password"
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
                    Congratulations! Your password meets the security criteria
                  </span>
                </div>
              </div>
            ) : (
              formData.senha && (
                <div className="bg-card/50 border rounded-lg p-4 space-y-2 shadow-sm">
                  <h4 className="font-medium text-sm mb-2">
                    Password requirements:
                  </h4>
                  <PasswordCheckItem
                    isValid={passwordChecks.hasNumber}
                    text="Must contain at least one number"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.hasSpecialChar}
                    text="Must contain at least one special character"
                  />
                  <PasswordCheckItem
                    isValid={
                      passwordChecks.hasUpperCase && passwordChecks.hasLowerCase
                    }
                    text="Must contain uppercase and lowercase letters"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.atLeast8Chars}
                    text="Must be at least 8 characters"
                  />
                  <PasswordCheckItem
                    isValid={passwordChecks.noInsecureChars}
                    text="Must not contain insecure characters"
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
                {loading ? "Creating account..." : "Create account"}
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <span className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-semibold hover:underline transition-colors"
            >
              Sign in
            </Link>
          </span>
        </CardFooter>
      </Card>
    </main>
  );
}
