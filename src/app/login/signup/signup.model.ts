export interface SignupFormData {
  nome: string;
  usuario: string;
  email: string; // Adicionando email
  senha: string; // Alterado de password para senha
  perfil: string; // Novo campo
}

export interface Errors {
  [key: string]: string;
}

export interface PasswordChecks {
  hasNumber: boolean;
  hasSpecialChar: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  noInsecureChars: boolean;
  atLeast8Chars: boolean;
}

export const initialFormData: SignupFormData = {
  nome: "",
  usuario: "",
  email: "",
  senha: "",
  perfil: "",
};

export const initialPasswordChecks: PasswordChecks = {
  hasNumber: false,
  hasSpecialChar: false,
  hasUpperCase: false,
  hasLowerCase: false,
  noInsecureChars: true,
  atLeast8Chars: false,
};

export const validatePassword = (password: string): PasswordChecks => {
  return {
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    noInsecureChars: !/['"`]/.test(password),
    atLeast8Chars: password.length >= 8,
  };
};

export const validateField = (name: string, value: string): string => {
  let error = "";
  switch (name) {
    case "nome":
      if (value.trim().length < 2)
        error = "Nome deve ter ao menos dois caracteres";
      break;
    case "usuario":
      if (value.trim().length < 3)
        error = "Usuário deve ter ao menos 3 caracteres";
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Email inválido";
      break;
    case "senha":
      if (value.trim().length < 8)
        error = "A senha deve ter pelo menos 8 caracteres";
      break;
    case "perfil":
      if (!value) error = "Perfil é obrigatório";
      break;
  }
  return error;
};
