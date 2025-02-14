"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { Shield, Lock, Settings, Key, CheckCircle2 } from "lucide-react";
import { api } from "@/service/api.service";
import { User } from "@/types/user";

export default function SettingsPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.user.me();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, []);

  const handleEnable2FA = async () => {
    try {
      setLoading(true);
      const response = await api.user.enable2FA();
      setQrCode(response.qrCode);
      setSecret(response.secret);
    } catch (err) {
      setError("Error enabling 2FA. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm2FA = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.user.confirm2FA(verificationCode, secret);
      if (response.success && user) {
        setQrCode("");
        setSecret("");
        setVerificationCode("");
        setUser({ ...user, twoFactorEnabled: true });
        alert("2FA enabled successfully!");
      }
    } catch (err) {
      setError("Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-md p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Settings className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your security and account preferences
            </p>
          </div>
        </div>
      </div>

      {/* Security Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Two-Factor Authentication (2FA)
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.twoFactorEnabled ? (
              <div className="flex flex-col items-center gap-4 p-6 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-green-600">2FA Enabled</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your account is protected with two-factor authentication
                  </p>
                </div>
              </div>
            ) : (
              <>
                {!qrCode && (
                  <Button
                    onClick={handleEnable2FA}
                    disabled={loading}
                    className="w-full"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {loading ? "Enabling..." : "Enable 2FA"}
                  </Button>
                )}

                {qrCode && (
                  <div className="space-y-4">
                    <div className="relative aspect-square w-48 mx-auto rounded-3xl border-4 border-primary overflow-hidden bg-white p-2">
                      <Image
                        src={qrCode}
                        alt="QR Code for 2FA"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      Scan the QR Code with your authenticator app
                    </p>
                    <Input
                      type="text"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      className="text-center font-mono text-lg"
                    />
                    {error && (
                      <AlertDescription className="text-red-500 text-center">
                        {error}
                      </AlertDescription>
                    )}
                    <Button
                      onClick={handleConfirm2FA}
                      disabled={loading || verificationCode.length !== 6}
                      className="w-full"
                    >
                      {loading ? "Verifying..." : "Confirm"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Security Recommendations
            </CardTitle>
            <CardDescription>
              Tips to keep your account protected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-3 rounded-md bg-primary/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use strong passwords</p>
                  <p className="text-xs text-muted-foreground">
                    Combine letters, numbers, and symbols
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-3 rounded-md bg-primary/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Keep your data secure</p>
                  <p className="text-xs text-muted-foreground">
                    Never share your credentials
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
