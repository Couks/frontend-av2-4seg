export interface User {
  id: number;
  name: string;
  email: string;
  twoFactorEnabled: boolean;
  isVerified: boolean;
}
