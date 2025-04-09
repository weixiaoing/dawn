import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import client from "./db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub, Google],
  callbacks: {
    // jwt({ token, user }) {
    //   if (user) {
    //     // User is available during sign-in
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    session({ session, user }) {
      session.user.id = user.id as string;
      return session;
    },
  },
});
