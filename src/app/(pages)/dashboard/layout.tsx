// src/app/dashboard/layout.tsx
"use client";
import { useUser } from "@/hooks/user/use-user";
import { ReactNode, useState } from "react";
import { User, Cog, FileChartColumn } from "lucide-react";
import Profile from "./page";
import Settings from "./settings/page";
import Reports from "./reports/page";

const menuItems = [
  { name: "Perfil", icon: <User />, key: "profile" },
  { name: "Configurações", icon: <Cog />, key: "settings" },
  { name: "Relatórios", icon: <FileChartColumn />, key: "reports" }, // Adicionando mais itens
];

// Mapeamento de chaves para componentes
const componentMap = {
  profile: <Profile />,
  settings: <Settings />,
  reports: <Reports />,
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>("profile");

  // Função para renderizar o componente ativo baseado na chave
  const renderActiveComponent = () => {
    return componentMap[activeTab] || null;
  };

  return (
    <div className="min-h-screen flex">
      <aside className="sm:w-1/6 sm:block hidden bg-gray-800 text-white p-6 rounded-r-lg">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <nav className="flex flex-col justify-between h-full overflow-hidden">
          <ul className="space-y-2">
            {menuItems.map((item) => (
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
              <li>
                {user?.firstName} {user?.lastName}
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Bem-vindo de volta, {user?.firstName} {user?.lastName}!
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}
