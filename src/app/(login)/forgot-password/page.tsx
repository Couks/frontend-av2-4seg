"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";
import { api } from "@/service/api.service";
import { Shield, Mail, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import { AxiosError } from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.user.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Error requesting recovery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-8 bg-background">
      <Card className="w-full max-w-xl mx-auto relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4"
          onClick={() => router.push("/signin")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription className="text-muted-foreground flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            Enter your email to receive instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-8">
              <Input
                type="email"
                className="w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <AlertDescription className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </AlertDescription>
              )}
              {success && (
                <AlertDescription className="text-green-500 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Instructions sent to your email
                </AlertDescription>
              )}
              <Button
                type="submit"
                className="w-full max-w-xs text-base py-6"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Instructions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
