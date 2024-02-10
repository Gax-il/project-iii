"use server"

import { getAllRoles, getRoleById, getRoleByName } from "@/data/role"

export const getRoleNameById = async(id: string) => {
  const role = await getRoleById(id);
  const name = role?.name;
  return name;
}

export const getRoleIdByName = async (name: string) => {
  const role = await getRoleByName(name);
  const id = role?.id;
  return id;
}

export const getRoles = async () => {
  const roles = await getAllRoles();
  return roles;
}