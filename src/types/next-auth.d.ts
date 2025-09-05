import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    _id: string;
    username: string;
    isVerified: boolean;
    image?: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }

  interface JWT {
    _id: string;
    username: string;
    isVerified: boolean;
    image?: string;
  }
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: any) => void) => void;
}