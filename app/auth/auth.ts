import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { adpaterPromise } from "util/mongodb";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  adapter: MongoDBAdapter(adpaterPromise()) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "e-mail", type: "text", placeholder: "e-mail" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const adapter = authConfig.adapter;

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("제대로 입력해라");
        }
        if (!adapter) {
          throw new Error("어뎁터 확인해바");
        }

        try {
          const res = await fetch(`${process.env.DEV_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            const failed = await res.json();
            throw new Error(failed.error as string);
          }

          const { userData } = await res.json();
          const user: User = {
            id: userData.email,
            email: userData.email,
            name: userData.name,
            image: userData.image,
          };

          return user;
        } catch (e: unknown) {
          if (e instanceof Error) {
            throw new Error(e.message);
          } else {
            throw new Error("Unknown error");
          }
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET as string,
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      // session.accessToken = user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

/*
 * 매번 서버컴포넌트에서 middleware 거치지 않도록 하는 helper 함수
 */
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
