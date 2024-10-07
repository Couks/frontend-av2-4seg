import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@/contexts/useContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secuty Web App",
  description: "Project designed for 4SEG discipline, from FAETERJ-Rio.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
