// src/layouts/DashboardLayout.tsx
"use client";
import { useUser } from "@/hooks/user/use-user";
import { User, Cog, FileChartColumn } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  name: string;
  icon: JSX.Element;
  key: string;
}

interface MenuItems {
  [key: string]: MenuItem[];
}

const menuItems: MenuItems = {
  admin: [
    { name: "Perfil", icon: <User />, key: "profile" },
    { name: "Configurações", icon: <Cog />, key: "settings" },
    { name: "Relatórios", icon: <FileChartColumn />, key: "reports" },
  ],
  professor: [
    { name: "Perfil", icon: <User />, key: "profile" },
    { name: "Relatórios", icon: <FileChartColumn />, key: "reports" },
  ],
  aluno: [{ name: "Perfil", icon: <User />, key: "profile" }],
};

export default function DashboardLayout() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>("profile");

  const userProfile = user?.perfil || "admin";
  const availableMenuItems = menuItems[userProfile] || [];

  return (
    <div className="flex min-h-screen ">
      <aside className="sm:w-1/6 sm:block hidden bg-gray-800 text-white p-6 rounded-r-lg">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <nav className="flex flex-col justify-around">
          <ul className="space-y-2">
            {availableMenuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center 
                    w-full text-left p-2 hover:bg-gray-700 rounded-md transition ${
                      activeTab === item.key ? "bg-gray-700" : ""
                    }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <p>{item.name}</p>
                </button>
              </li>
            ))}
          </ul>

          {/* Informações do usuário */}
          <div className="bg-slate-700 text-white p-4 rounded-md">
            <h2 className="text-md font-bold mb-2">Informações do Usuário</h2>
            <ul className="space-y-1 text-sm">
              <li> {user?.email}</li>
              <li>{user?.nome}</li>
            </ul>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Bem-vindo de volta, {user?.nome}!
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {activeTab === "profile" && <div>Perfil do Usuário</div>}
          {activeTab === "settings" && <div>Configurações</div>}
          {activeTab === "reports" && <div>Relatórios</div>}
        </main>
      </div>
    </div>
  );
}
