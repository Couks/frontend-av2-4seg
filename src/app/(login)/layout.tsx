import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        {children} <ThemeToggle className="absolute right-4 top-4" />
      </main>
    </div>
  );
}
