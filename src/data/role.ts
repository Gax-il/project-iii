import { db } from "@/lib/db";

export const getRoleById = async (id: string) => {
  try {
    const role = await db.role.findUnique({
      where: { id }
    })
    return role;
  } catch {
    return null;
  }
}

export const getRoleByName = async (name: string) => {
  try {
    const role = await db.role.findUnique({
      where: {name}
    })
    return role
  } catch {
    return null;
  }
}

export const getPermissionsByRoleId = async (id: string) => {
  try {
    const role = await db.role.findUnique({
      where: {id}
    })

    const perm = role?.permissions

    return perm;
  } catch {
    return null;
  }
}

export const getAllRoles = async () => {
  try {
    const roles = await db.role.findMany()
    return roles;
  }
  catch {
    return null;
  }
}