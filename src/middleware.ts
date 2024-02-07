import authConfig from "@/auth.config";

import next from "next";

import NextAuth from "next-auth";

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_AUTH_REDIRECT,
  verRoutes,
  adminRoute
} from "@/routes"
import { getSession } from "next-auth/react";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isVerRoute = verRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null;
  }

  if (isVerRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn){
      return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
    }
    return null;
  }


  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl + nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return null;

})

export const config = {
matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}