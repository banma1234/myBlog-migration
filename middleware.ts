import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.AUTH_SECRET as string,
  callbacks: {
    authorized({ token }) {
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin/:path*"] };
