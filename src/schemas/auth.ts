import { EMAIL_NOT_EMAIL, EXCEED_MAX_CHARS, INVALID_EMAIL, INVALID_NAME, INVALID_PASSWORD, PASSWORDS_NOT_MATCHING } from "@/assets/messages";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: INVALID_EMAIL
  }).max(64, {
    message: EXCEED_MAX_CHARS(64)
  }),
  password: z.string().min(1,{
    message: INVALID_PASSWORD
  }).max(128, {
    message: EXCEED_MAX_CHARS(128)
  })
})

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: INVALID_NAME
  }).max(64, {
    message: EXCEED_MAX_CHARS(64)
  }),
  email: z.string().email({
    message: INVALID_EMAIL
  }).max(64, {
    message: EXCEED_MAX_CHARS(64)
  }),
  password: z.string().min(1, {
    message: INVALID_PASSWORD
  }).max(128, {
    message: EXCEED_MAX_CHARS(128)
  }),
  confirmationPassword: z.string().min(1, {
    message: INVALID_PASSWORD
  }).max(128, {
    message: EXCEED_MAX_CHARS(128)
  })
}).refine((data) => {
  if (data.password !== data.confirmationPassword) {
    return false
  }
  return true
}, {
  message: PASSWORDS_NOT_MATCHING,
  path: ["confirmationPassword"]
})

export const NameEmailChangeSchema = z.object({
  name: z.string().max(64, {
    message: EXCEED_MAX_CHARS(64)
  }),
  email: z.string().max(64, {
    message: EXCEED_MAX_CHARS(64)
  })
}).refine((data) => {
  if (data.email == "") {
    return true;
  }
  if (z.string().email().safeParse(data.email)) {
    return true
  }
  return false
}, {
  message: EMAIL_NOT_EMAIL
})

export const PasswordChangeSchema = z.object({
  password: z.string().min(1, {
    message: INVALID_PASSWORD
  }).max(128, {
    message: EXCEED_MAX_CHARS(128)
  }),
  confirmationPassword: z.string().min(1, {
    message: INVALID_PASSWORD
  }).max(128, {
    message: EXCEED_MAX_CHARS(128)
  })
}).refine((data) => {
  if (data.password !== data.confirmationPassword) {
    return false
  }
  return true
}, {
  message: PASSWORDS_NOT_MATCHING,
  path: ["confirmationPassword"]
})

export const PasswordSchema = z.object({
  password: z.string().min(1, {
    message: INVALID_PASSWORD
  }).max(128, {
    message: EXCEED_MAX_CHARS(128)
  }),
})

export const EmailSchema = z.object({
  email: z.string().email({
    message: INVALID_EMAIL
  }).max(64, {
    message: EXCEED_MAX_CHARS(64)
  }),
})