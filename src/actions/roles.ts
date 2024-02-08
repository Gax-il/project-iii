"use server"

import { getRoleById } from "@/data/role"

export const getRoleNameById = async(id: string) => {
  const role = await getRoleById(id);
  const name = role?.name;
  return name;
}