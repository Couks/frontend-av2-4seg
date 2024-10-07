// src/hooks/user/use-user.ts
import { useUserContext } from "@/contexts/useContext";
import { useEffect, useState } from "react";

export const useUser = () => {
  const { user, setUser, token, setToken } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      const data = await response.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const storeToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return { user, loading, error, storeToken };
};
