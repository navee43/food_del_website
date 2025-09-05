import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/connectDb";
import { UserModel } from "../../../../model/User";
import { User } from "lucide-react";
import { Types } from "mongoose";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDb();
        try {
          const user = await UserModel.findOne({
            $or: [
              // { username: credentials.identifier },
              { email: credentials.identifier },
            ],
          });
          if (!user) throw new Error("No user found with this email");
          if (!user.isVerified) throw new Error("Please verify your account first");

          const isPassCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPassCorrect) throw new Error("Incorrect password");

          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    /**
     * Runs whenever a user signs in (Google or Credentials)
     */
    
  async signIn({ user, account }) {
    if (account?.provider === "google") {
      await connectDb();

      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        await UserModel.create({
          username: user.email?.split("@")[0] || `user_${Date.now()}`,
          email: user.email,
          password: "google-oauth", // dummy value so schema passes
          verifyCodeExpiry: new Date(), // can set to current time
          isVerified: true
        });
      }
    }
    return true;
  },

    async jwt({ token, user }) {

      if (user) {
      const dbUser = await UserModel.findOne({ email: user.email });

      if (dbUser) {
        token._id = (dbUser._id as Types.ObjectId).toString();
        token.isVerified = dbUser.isVerified;
        token.username = dbUser.username;
        token.image = dbUser.image;
      }
    }
     // On subsequent requests `user` is undefined, just return existing token
    return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.image = token.image;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
