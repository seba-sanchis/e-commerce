import type { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import UserModel from "@/models/user";
import { Sessions } from "@/types";
import { getUserByEmail } from "./actions/user.actions";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email) throw new Error("Invalid email");

          // check if user already exists
          const credentialUser = await getUserByEmail(credentials.email);

          // if not, throw an error
          if (!credentialUser) throw new Error("Invalid credentials");

          // check if password is correct
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            credentialUser.account.password
          );

          if (!passwordMatch) throw new Error("Invalid credentials");

          const user = {
            id: credentialUser.id.toString(),
            email: credentialUser.account.email,
          };

          return user;
        } catch (error: any) {
          console.log("Error checking if user exists: ", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user, account, profile }) {
    //   if (user) token.user = user;

    //   return token;
    // },
    async session({ session }: { session: Sessions }) {
      try {
        if (!session.user?.email) throw new Error("Invalid email");

        // store the user in session
        const response = await getUserByEmail(session.user.email);

        session.user = response;

        return session;
      } catch (error: any) {
        console.log("Error storing the user in session: ", error.message);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        if (!user.email) throw new Error("Invalid email");

        // check if user already exists
        const userExists = await getUserByEmail(user.email);

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await UserModel.create({
            email: user.email as string,
            // name: user.name as string,
            // image: user.image as string,
          });
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};
