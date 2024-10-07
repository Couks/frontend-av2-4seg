import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Errors, SignupFormData } from "@/app/login/signup/signup.model";

export const useSignup = (
  formData: SignupFormData,
  setErrors: (errors: Errors) => void
) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const router = useRouter();

  const onSubmit = async () => {
    console.log("API URL: ", process.env.NEXT_PUBLIC_API_URL);
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
        formData
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("jwt_token", token);
      }

      setSuccessMessage(
        response.data.message || "Cadastro realizado com sucesso!"
      );

      router.push("/login/captcha");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message || "Erro ao realizar o cadastro."
        );
        setErrors({ ...error.response.data.errors });
      } else {
        setErrorMessage("Erro ao realizar o cadastro.");
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    errorMessage,
    successMessage,
  };
};
