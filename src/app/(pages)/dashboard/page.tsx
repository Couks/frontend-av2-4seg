"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  Cog,
  Edit,
  Home,
  LogOut,
  Moon,
  PieChart,
  Sun,
  User,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock user data
  const user = {
    name: "Matheus Castro",
    email: "matehuscastroks@gmail.com",
    avatar: "https://github.com/Couks.png",
  };

  // Mock dashboard data
  const stats = [
    { title: "Total de Projetos", value: 12, color: "bg-blue-500" },
    { title: "Membros da Equipe", value: 8, color: "bg-green-500" },
    { title: "Tarefas Concluídas", value: 64, color: "bg-purple-500" },
    { title: "Horas Registradas", value: 120, color: "bg-orange-500" },
  ];

  const recentActivity = [
    {
      action: "Tarefa concluída",
      item: "Atualizar interface do usuário",
      time: "2 horas atrás",
    },
    {
      action: "Membro adicionado",
      item: "Sarah Parker",
      time: "5 horas atrás",
    },
    {
      action: "Novo projeto criado",
      item: "Campanha de Marketing Q3",
      time: "Ontem",
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd apply the dark mode class to the root element here
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <div className="text-2xl font-bold mb-8">MeuPainel</div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Home className="mr-2 h-4 w-4" /> Início
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Users className="mr-2 h-4 w-4" /> Equipe
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <PieChart className="mr-2 h-4 w-4" /> Análises
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Cog className="mr-2 h-4 w-4" /> Configurações
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow-sm h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Bem-vindo de volta, {user.name}!
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar Painel</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  <span>{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className={`${stat.color} text-white rounded-t-lg`}>
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Progresso do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="flex-1">Redesign do Site</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex items-center">
                    <span className="flex-1">Desenvolvimento do App Móvel</span>
                    <span className="text-muted-foreground">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <div className="flex items-center">
                    <span className="flex-1">Campanha de Marketing</span>
                    <span className="text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.item}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
