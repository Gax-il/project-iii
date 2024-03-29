"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import {
	BAD_INPUT,
	EMAIL_IN_USE_OAUTH,
	EMAIL_TAKEN,
	ERROR_MSG,
	SUCCESSFUL_REGISTRATION,
} from "@/assets/messages";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: BAD_INPUT };
	}

	const { email, password, name } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser?.password && existingUser) {
		return { error: EMAIL_IN_USE_OAUTH };
	}

	if (existingUser != null) {
		return { error: EMAIL_TAKEN };
	}

	const defaultRoleId = process.env.DEFAULT_ROLE_ID;
	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			roleId: defaultRoleId,
		},
	});

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);

	return { success: SUCCESSFUL_REGISTRATION };
};
