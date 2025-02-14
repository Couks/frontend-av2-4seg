import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Lock, ArrowRight, UserPlus, Key } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <main className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-4">
        <ThemeToggle />
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-10 w-10 text-primary animate-pulse" />
            <h1 className="text-center text-4xl font-bold text-primary py-2">
              Web App Security
            </h1>
          </div>
          <p className="max-w-[42rem] text-center text-muted-foreground sm:text-xl">
            A modern and secure platform with two-factor authentication to
            protect your data.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 max-w-3xl">
          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-lg">
            <Key className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-semibold">Already have an account?</h2>
            <p className="text-center text-muted-foreground">
              Access your account securely with two-factor authentication
            </p>
            <Link href="/signin" className="w-full">
              <Button className="w-full group" variant="default">
                Log In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8 shadow-lg">
            <UserPlus className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-semibold">New here?</h2>
            <p className="text-center text-muted-foreground">
              Create your account and enjoy all the security features
            </p>
            <Link href="/signup" className="w-full">
              <Button className="w-full group" variant="secondary">
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full border-t bg-foreground dark:bg-background py-3">
        <div className="container mx-auto flex flex-col items-center ">
          <p className="text-center text-xs text-muted-foreground">
            Project developed for the Information Security discipline -
            FAETERJ-Rio
          </p>
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Web App Security. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
