import type { NextAuthOptions, User as Users } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";

import User from "@/models/user";
import { connectToDB } from "@/lib/database";
import { Sessions, UserProfile } from "@/common.types";
import { getUser } from "./actions/user.actions";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Sessions }) {
      // store the user id from MongoDB to session
      const response = await getUser(session.user as UserProfile);

      session.user = response;

      return session;
    },
    async signIn({ user }: { user: AdapterUser | Users }) {
      try {
        await connectToDB();
        console.log("user", user);
        // check if user already exists
        const userExists = (await User.findOne({
          email: user.email as string,
        })) as { user?: UserProfile };

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: user.email as string,
            name: user.name as string,
            image: user.image as string,
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
