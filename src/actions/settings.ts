"use server"

import bcrypt from "bcryptjs"
import * as z from "zod";
import { NameEmailChangeSchema, PasswordChangeSchema, PasswordSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { BAD_INPUT, EMAIL_CHANGED, EMAIL_NOT_FOUND, NAME_CHANGED, NAME_EMAIL_CHANGED } from "@/assets/messages";
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export const nameEmailChange = async (
  values: z.infer<typeof NameEmailChangeSchema>
) => {
  const validatedFields = NameEmailChangeSchema.safeParse(values)

  if (!validatedFields.success) {
    return {error: BAD_INPUT}
  }
  const { name, email } = validatedFields.data;
  
  const nameChanged = name === "" ? false : true;
  const emailChanged = email === "" ? false : true;

  if (!nameChanged && !emailChanged) {
    return {error: "Nic se nezměnilo"}
  }

  const user = await currentUser();


  if (!user) {
    return { error: "Not logged in" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "User not found" };
  }
  

  if (nameChanged && emailChanged) {
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        email,
        name
      }
    });
    
    EmailChangedVerification(email, dbUser)

    return {success: NAME_EMAIL_CHANGED}
  }

  if (nameChanged) {
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        name,
      }
    });

    return {success: NAME_CHANGED}
  }
  if(emailChanged) {
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        email
      }
    });

    EmailChangedVerification(email, dbUser)
    
    return { success: EMAIL_CHANGED };
  } 
}

export const passwordChange = async(
  values: z.infer<typeof PasswordSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Not logged in" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "User not found" };
  }

  if (!dbUser.password) {
    return {error: "OAuth"}
  }

  const { password } = values
  
  const { password: dbPassword } = dbUser 
  

  const passwordIsMatch = await bcrypt.compare(
    password,
    dbPassword
  );


  console.log(password, dbPassword)

  if (!passwordIsMatch) {
    return {error: "Špatné heslo"}
  }

  if (!dbUser.email) {
    return {error: EMAIL_NOT_FOUND}
  }

  const resetPasswordToken = await generatePasswordResetToken(dbUser.email)

  const ResetRoute = `/reset-password?token=${resetPasswordToken.token}`

  redirect(ResetRoute)
}

const EmailChangedVerification = async (email: string, user: User) => {
  const id = user.id
  try {
    await db.user.update({
      where: { id },
      data: {
        emailVerified: null
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }

  console.log(await getUserById(id))

  const verificationToken = await generateVerificationToken(email);
  sendVerificationEmail(email, verificationToken.token)
} 