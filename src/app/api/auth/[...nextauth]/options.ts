import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectDb from "@/lib/connectDb";
import { UserModel } from "../../../../model/User";
import { Types } from "mongoose";

type UserCredentials = {
  identifier: string;
  password: string;
};

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
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;
        await connectDb();

        try {
          const user = await UserModel.findOne({
            $or: [{ email: credentials.identifier }],
          });

          if (!user) throw new Error("No user found with this email");
          if (!user.isVerified) throw new Error("Please verify your account first");

          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPassCorrect) throw new Error("Incorrect password");

          // ✅ Return a NextAuth-compatible `User`
          return {
            id: (user._id as Types.ObjectId).toString(), // NextAuth requires `id`
            _id: (user._id as Types.ObjectId).toString(),
            username: user.username,
            email: user.email,
            image: user.image,
            isVerified: user.isVerified,
          } as User;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDb();
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            username: user.email?.split("@")[0] || `user_${Date.now()}`,
            email: user.email,
            password: "google-oauth", // dummy value
            verifyCodeExpiry: new Date(),
            isVerified: true,
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
          token.username = dbUser.username;
          token.isVerified = dbUser.isVerified;
          token.image = dbUser.image;
         
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.image = token.image as string | undefined;

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
