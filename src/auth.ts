import NextAuth, { type Session } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, Role } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";
import { getRoleById } from "@/data/role";

const prisma = new PrismaClient()

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          roleId: process.env.DEFAULT_ROLE_ID
        },
      });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      // console.log({ sessiontoken: token })
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }

      if (token?.role && session.user) {
        session.user.role = token.role as Role; 
      }

      if (session.user) {
        session.user.name = token?.name;
        session.user.email = token?.email;
        session.user.isOAuth = token?.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      
      token.role = await getRoleById(existingUser.roleId as string)

      return token;
    },
  },
  session: {strategy: 'jwt'},
  ...authConfig,
})