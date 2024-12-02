"use client";

import { useAuth } from "@/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Key,
  UserCheck,
  Bell,
  Activity,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Bem-vindo, {user?.name}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Status:</span>
                {user?.isVerified ? (
                  <span className="text-green-500 font-medium">Verificada</span>
                ) : (
                  <span className="text-yellow-500 font-medium">Pendente</span>
                )}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>2FA:</span>
                {user?.twoFactorEnabled ? (
                  <span className="text-green-500 font-medium">Ativado</span>
                ) : (
                  <span className="text-yellow-500 font-medium">
                    Desativado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segurança</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">
              {user?.twoFactorEnabled ? "Protegida" : "Básica"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Status de proteção da conta
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Acesso</CardTitle>
            <Calendar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {new Date().toLocaleDateString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Último login registrado
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões</CardTitle>
            <Users className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">1 ativa</div>
            <p className="text-xs text-muted-foreground mt-1">
              Dispositivos conectados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Tips Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Atividade Recente
              </CardTitle>
              <CardDescription>Monitoramento de ações na conta</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Seu histórico de atividades aparecerá aqui.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Recomendações
            </CardTitle>
            <CardDescription>Otimize a segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-3 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Autenticação em duas etapas
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reforce sua segurança
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-3 rounded-md bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                  <Key className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Senha forte</p>
                  <p className="text-xs text-muted-foreground">
                    Use combinações seguras
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-3 rounded-md bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <Bell className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Verificação de email</p>
                  <p className="text-xs text-muted-foreground">
                    Mantenha seus dados atualizados
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
