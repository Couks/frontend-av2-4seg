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
  Bell,
  Activity,
  Lock,
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

  const recommendations = [
    {
      id: "2fa",
      enabled: user?.twoFactorEnabled,
      title: "Two-Factor Authentication",
      description: "Enhance your security",
      icon: Shield,
      bgColor: "primary",
    },
    {
      id: "strongPassword",
      enabled: true,
      title: "Strong Password",
      description: "Use secure combinations",
      icon: Key,
      bgColor: "yellow-500",
    },
    {
      id: "emailVerification",
      enabled: user?.isVerified,
      title: "Email Verification",
      description: "Keep your data updated",
      icon: Bell,
      bgColor: "blue-500",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome, {user?.name}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Status:</span>
                {user?.isVerified ? (
                  <span className="text-green-500 font-medium">Verified</span>
                ) : (
                  <span className="text-yellow-500 font-medium">Pending</span>
                )}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>2FA:</span>
                {user?.twoFactorEnabled ? (
                  <span className="text-green-500 font-medium">Enabled</span>
                ) : (
                  <span className="text-yellow-500 font-medium">Disabled</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">
              {user?.twoFactorEnabled ? "Protected" : "Basic"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Account protection status
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Access</CardTitle>
            <Calendar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {new Date().toLocaleDateString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last login recorded
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <Users className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">1 active</div>
            <p className="text-xs text-muted-foreground mt-1">
              Connected devices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Tips Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Account activity monitoring</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-card text-card-foreground p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Your activity history will appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Recommendations
            </CardTitle>
            <CardDescription>Optimize your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recommendations.map(
                (rec) =>
                  !rec.enabled && (
                    <li
                      key={rec.id}
                      className={`flex items-center gap-4 p-3 rounded-md bg-${rec.bgColor}/5 hover:bg-${rec.bgColor}/10 transition-colors`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-${rec.bgColor}/10`}
                      >
                        <rec.icon className={`h-5 w-5 text-${rec.bgColor}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{rec.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {rec.description}
                        </p>
                      </div>
                    </li>
                  )
              )}
              {recommendations.every((rec) => rec.enabled) && (
                <li className="flex items-center gap-4 p-3 rounded-md bg-green-500/5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">All set!</p>
                    <p className="text-xs text-muted-foreground">
                      Your account is well protected
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
