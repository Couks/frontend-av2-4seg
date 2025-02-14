"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/service/api.service";

interface User {
  id: number;
  name: string;
  email: string;
  twoFactorEnabled?: boolean;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    tempToken?: string;
  }>;
  logout: () => Promise<void>;
  verify2FA: (code: string, tempToken: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (token: string) => {
    try {
      const validationResponse = await api.token.validate(token);

      if (validationResponse.valid) {
        const userData = await api.user.me();

        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          twoFactorEnabled: userData.twoFactorEnabled,
          isVerified: userData.isVerified,
        });
        setError(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Erro ao buscar dados do usuário");
      return false;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; tempToken?: string }> => {
    try {
      setError(null);
      const response = await api.auth.login({ email, password });

      const { accessToken, refreshToken, tempToken } = response;

      if (tempToken) {
        return { success: false, tempToken };
      }

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        await fetchUserData(accessToken);
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      setError("Erro ao realizar login. Verifique suas credenciais.");
      throw error;
    }
  };

  useEffect(() => {
    const validateSession = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const isValid = await fetchUserData(token);
        if (!isValid) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          setError("Sessão inválida");
        }
      } catch (error) {
        console.error("Session validation error:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setError("Erro ao validar sessão");
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  const logout = async () => {
    try {
      setError(null);
      const response = await api.auth.logout();
    } catch (error) {
      console.error("Erro no logout:", error);
      setError("Erro ao realizar logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  const verify2FA = async (
    code: string,
    tempToken: string
  ): Promise<boolean> => {
    try {
      setError(null);
      const response = await api.user.verify2FA(code, tempToken);
      const { accessToken, refreshToken } = response;

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        await fetchUserData(accessToken);
        return true;
      }
      setError("Código 2FA inválido");
      return false;
    } catch (error) {
      console.error("Erro na verificação 2FA:", error);
      setError("Erro ao verificar código 2FA");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, verify2FA }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
