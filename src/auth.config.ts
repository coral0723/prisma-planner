import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnMainPage = nextUrl.pathname.startsWith("/main");

      if (isOnMainPage) {
        return isLoggedIn;
      }

      // 로그인 상태에서 로그인 페이지 접근
      if (isLoggedIn && nextUrl.pathname === "/") {
        return Response.redirect(new URL("/main", nextUrl));
      }

      return true;
    },
  },

  pages: {
    signIn: "/",
  },
} satisfies NextAuthConfig;
