import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/user";
import { connectToDB } from "@/lib/database";
import { Item, Sessions, UserProfile } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
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
      if (session.user) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({
          email: session.user.email as string,
        }).populate("bag"); // Populate the items in the user's bag

        // Calculate the total quantity of products in the bag
        const items = sessionUser.bag.reduce(
          (acc: number, item: Item) => acc + item.quantity,
          0
        );

        session.user.id = sessionUser._id.toString();
        session.user.dni = sessionUser.dni;
        session.user.bag = sessionUser.bag;
        session.user.items = items; // Add total quantity to the user object
        session.user.favorite = sessionUser.favorite;
      }

      return session;
    },
  },
};
