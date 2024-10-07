import { useState } from "react";
import {
  SignupFormData,
  initialFormData,
  Errors,
  validatePassword,
  validateField,
  PasswordChecks,
  initialPasswordChecks,
} from "./signup.model";
import { useSignup } from "@/hooks/auth/use-register";

export const useSignupController = () => {
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>(
    initialPasswordChecks
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const { handleSubmit: submitSignup } = useSignup(formData, setErrors);

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
        senha: isValid ? "" : "Sua senha não atende os criterios de segurança",
      }));

      if (isValid) {
        setShowPasswordValidation(true);
      } else {
        setShowPasswordValidation(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors: Errors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key as keyof SignupFormData]);
      if (error) {
        formErrors[key] = error;
      }
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    submitSignup();
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
  };
};
