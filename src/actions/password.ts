"use server"
import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { PasswordChangeSchema } from "@/schemas/auth";
import { BAD_INPUT, EMAIL_NOT_FOUND, NO_TOKEN, PASSWORD_CHANGED, TOKEN_EXPIRED } from "@/assets/messages";


export const resetPassword = async(
  values: z.infer<typeof PasswordChangeSchema>,
  token?: string | null
) => {
  if (!token) {
    return {error: NO_TOKEN};
  }

  const validatedFields = PasswordChangeSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: BAD_INPUT};
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {error: NO_TOKEN}
  }


  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {error: TOKEN_EXPIRED};
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {error: EMAIL_NOT_FOUND};
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    }
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  });

  return {success: PASSWORD_CHANGED};
}