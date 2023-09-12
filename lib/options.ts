import type { NextAuthOptions, User as Users } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import { connectToDB } from "@/lib/database";
import { Sessions, UserProfile } from "@/common.types";
import { getUser } from "./actions/user.actions";
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
          await connectToDB();

          // check if user already exists
          const credentialUser = (await User.findOne({
            email: credentials?.email as string,
          })) as UserProfile;

          // if not, throw an error
          if (!credentialUser) throw new Error("Invalid credentials");

          // check if password is correct
          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            credentialUser.password
          );

          if (!passwordMatch) throw new Error("Invalid credentials");

          const user = {
            id: credentialUser._id!.toString(),
            email: credentialUser.email,
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
      const response = await getUser(session.user as UserProfile);

      session.user = response;

      return session;
    },
    async signIn({ user }: { user: AdapterUser | Users }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = (await User.findOne({
          email: user.email as string,
        })) as { user?: UserProfile };

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
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
