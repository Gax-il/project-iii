"use server"

import { getNthUsers, getUsersCount } from "@/data/user"
import { User } from "@prisma/client";
import { getRoleNameById } from "./roles";
import { UserData } from "@/components/afterAuth/users-table/colums";

export const countUsers = async () => {
  const countResult = await getUsersCount()
  return countResult;
}

export const getNUsers = async (take: number, page: number) => {
  const Users = await getNthUsers(take, page)
  return Users;
}

export const getUserData = async (user: User) => {
  if (!user || !user.roleId || !user.email || !user.name) {
    console.log(1);
    console.error(1)
    return null;
  }
  const roleName = await getRoleNameById(user.roleId);
  if (!roleName) {
    console.error(1)
    return null;
  }
  const OAuth = !user.password ? true : false;
  const emailVerified = !!user.emailVerified ? true : false
  const userData: UserData = {
    name: user.name,
    id: user.id,
    OAuth: OAuth,
    email: user.email,
    role_name: roleName,
    email_verified: emailVerified
  }
  return userData;
}