import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../lib/server/prismaClientInstance";

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
      };
    },
  },
});
