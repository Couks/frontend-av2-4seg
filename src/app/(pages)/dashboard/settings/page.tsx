// src/app/dashboard/settings/page.tsx
"use client";
import { useUser } from "@/hooks/user/use-user";
import { useUpdateUser } from "@/hooks/user/use-update-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Settings() {
  const { user } = useUser();
  const {
    updateUserData,
    loading: updating,
    error: updateError,
  } = useUpdateUser();
  const [name, setName] = useState(user?.firstName || "");

  const handleSave = async () => {
    await updateUserData({ firstName: name });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <Button onClick={handleSave} disabled={updating}>
          Salvar
        </Button>
        {updateError && <p className="text-red-500">{updateError}</p>}
      </CardContent>
    </Card>
  );
}
