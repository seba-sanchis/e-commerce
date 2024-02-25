import type { NextAuthOptions, User as Users } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "./actions/user.actions";
import User from "@/models/user";
import { Sessions, User as UserType } from "@/types";

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
            credentialUser.password
          );

          if (!passwordMatch) throw new Error("Invalid credentials");

          const user = {
            id: credentialUser.id.toString(),
            email: credentialUser.email,
          };

          return user;
        } catch (error) {
          if (error instanceof Error)
            console.log(`Error checking if user exists: ${error.message}`);

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        if (!session.user?.email) throw new Error("Invalid email");

        // store the user in session
        const response = await getUserByEmail(session.user.email);

        session.user = response;

        return session;
      } catch (error) {
        if (error instanceof Error)
          console.log(`Error storing the user in session: ${error.message}`);

        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | Users }) {
      try {
        if (!user.email) throw new Error("Invalid email");

        // check if user already exists
        const userExists = await getUserByEmail(user.email);

        // if not, create a new document and save user in MongoDB
        if (!userExists) await User.create({ email: user.email });

        return true;
      } catch (error) {
        if (error instanceof Error)
          console.log(`Error checking if user exists: ${error.message}`);

        return false;
      }
    },
  },
};
