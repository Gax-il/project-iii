import { EmailResetPasswordTemplate } from "@/components/email/email-reset-password";
import { EmailVerificationTemplate } from "@/components/email/email-verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async(
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/email-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Prosím potvrďte svůj email",
    react: EmailVerificationTemplate({verificationLink: confirmLink})
  })
}

export const sendPasswordResetEmail = async(
  email: string,
  token: string
) => {
  const resetLink = `${domain}/reset-password?token=${token}`;
  await resend.emails.send({
    from: "noreply@gaxil.eu",
    to: email,
    subject: "Resetujte heslo na odkazu níže",
    react: EmailResetPasswordTemplate({resetLink: resetLink})
  })
}