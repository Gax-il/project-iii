"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { EMAIL_NOT_FOUND, NO_TOKEN, TOKEN_EXPIRED, VERIFICATION_SUCCESSFULL } from "@/assets/messages";

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: NO_TOKEN}
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: TOKEN_EXPIRED }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: EMAIL_NOT_FOUND }
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: VERIFICATION_SUCCESSFULL }
};