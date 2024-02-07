"use server";
import * as z from "zod";

import { EmailSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { EMAIL_IN_USE_OAUTH, EMAIL_NOT_EMAIL, EMAIL_NOT_FOUND, RESET_EMAIL_SENT } from "@/assets/messages";

export const reset = async (values: z.infer<typeof EmailSchema>) => {
  const validatedFields = EmailSchema.safeParse(values);


  if (!validatedFields.success) {
    return {error: EMAIL_NOT_EMAIL};
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  

  if (!existingUser) {
    return {error: EMAIL_NOT_FOUND};
  }

  if (existingUser.password == null) {
    return {error: EMAIL_IN_USE_OAUTH}
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  console.log(passwordResetToken);


  return {success: RESET_EMAIL_SENT};
};