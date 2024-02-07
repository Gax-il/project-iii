"use server"

import { db } from "@/lib/db"
import * as z from "zod";

import { RoleCreateSchema } from "@/schemas/role";

import { getRoleByName } from "@/data/role";
import { BAD_INPUT, ROLE_CREATED, ROLE_NAME_TAKEN } from "@/assets/messages";

export const createRole = async (values: z.infer<typeof RoleCreateSchema>) => {
  const validatedFields = RoleCreateSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error: BAD_INPUT}
  }

  const { name, permissions } = validatedFields.data;

  const existingRole = await getRoleByName(name)

  if (existingRole) {
    return {error: ROLE_NAME_TAKEN}
  }

  await db.role.create({
    data:{
      name,
      permissions
    }
  })

  console.log(name,permissions)

  return {success: ROLE_CREATED}
}