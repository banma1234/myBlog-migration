import NextAuth, { DefaultSession, User, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    token: JWT;
  }
  interface User extends DefaultUser {
    token: string;
  }
}
