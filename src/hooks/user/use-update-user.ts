// src/hooks/useUpdateUser.ts
import { useState } from "react";
import { User } from "@/types/User";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserData = async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/security/user/data", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados do usuário");
      }

      const updatedUser: User = await response.json();
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUserData, loading, error };
};
