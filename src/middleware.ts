import authConfig from "@/auth.config";

import NextAuth from "next-auth";

import {
	publicRoutes,
	authRoutes,
	apiAuthPrefix,
	DEFAULT_AUTH_REDIRECT,
	emailVerPrefix,
	resetPasswordPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isVerRoute = nextUrl.pathname.startsWith(emailVerPrefix);
	const isResetPasswordRoute = nextUrl.pathname.startsWith(resetPasswordPrefix);

	if (isApiAuthRoute) {
		return null;
	}

	if (isVerRoute) {
		return null;
	}

	if (isResetPasswordRoute) {
		return null;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl));
		}
		return null;
	}

	if (!isLoggedIn && !isPublicRoute) {
		const callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl + nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);
		return Response.redirect(
			new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
		);
	}

	return null;
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
