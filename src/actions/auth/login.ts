"use server";

import * as z from "zod";

import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas/auth";

import { signIn } from "@/auth";

import { DEFAULT_AUTH_REDIRECT } from "@/routes";

import { getUserByEmail } from "@/data/user";
import {
	BAD_CREDENTIALS,
	EMAIL_IN_USE_OAUTH,
	EMAIL_NOT_FOUND,
	EMAIL_NOT_VERIFIED,
	ERROR_MSG,
} from "@/assets/messages";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
	values: z.infer<typeof LoginSchema>,
	callbackUrl?: string | null,
) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email) {
		return { error: EMAIL_NOT_FOUND };
	}

	if (!existingUser.password) {
		return { error: EMAIL_IN_USE_OAUTH };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(email);
		sendVerificationEmail(email, verificationToken.token);
		return { notice: EMAIL_NOT_VERIFIED };
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_AUTH_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: BAD_CREDENTIALS };
				default:
					return { error: ERROR_MSG };
			}
		}

		throw error;
	}
};
