"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen p-8 bg-background">
      <Card className="w-full max-w-xl mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-500">
            Account Verified Successfully!
          </CardTitle>
          <CardDescription>
            You will be redirected to the login page shortly...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            <p>Thank you for verifying your account.</p>
            <p>Please log in to access the platform.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
