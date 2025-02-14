"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings, LayoutDashboard, Shield } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/signin");
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 text-primary p-4">
              <Shield className="h-6 w-6" />
              <span className="font-semibold text-lg">Dashboard</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarGroupLabel>User</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-4 py-2">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/124599?v=4"
                      alt="Morty"
                    />
                    <AvatarFallback>MO</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-foreground">
                      {user?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <SidebarMenuButton
                    variant="outline"
                    className="w-auto text-foreground hover:text-white hover:bg-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span className="text-sm font-bold">Logout</span>
                  </SidebarMenuButton>
                  <ThemeToggle />
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 w-full">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
