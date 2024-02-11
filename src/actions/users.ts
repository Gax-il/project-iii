"use server"

import * as z from "zod"
import { getNthUsers, getUsersCount, removeUserById } from "@/data/user"
import { User } from "@prisma/client";
import { getRoleIdByName, getRoleNameById } from "./roles";
import { UserData } from "@/components/afterAuth/users-table/columns";
import { UserEditSchema } from "@/schemas/auth";
import { getRoleById } from "@/data/role";
import { CHANGED, ERROR_MSG } from "@/assets/messages";
import { db } from "@/lib/db";

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
    return null;
  }
  const roleName = user.roleId ? await getRoleNameById(user.roleId) : null;
  if (!roleName) {
    return null;
  }
  const OAuth = !user.password ? true : false;
  const emailVerified = user.emailVerified ? true : false;
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

export const removeUser = async (userId: string) => {
  try{
    await removeUserById(userId);
    return ["Uživatel smazán",userId]
  } catch{
    return ["Zkuste znovu", "V případě častého vyskytnutí problému kontaktujte vývojáře"]
  }
  
}

export const updateUser = async (user: UserData, values: z.infer<typeof UserEditSchema>) => {

  const id = user.id;

  let emailVerChange: boolean|undefined;
  if (!user.OAuth) {
    emailVerChange = user.email_verified === values.emailVer ? false : true;
  } else {
    emailVerChange = false;
  }
  const roleChanged = values.role === user.role_name || !values.role ? false : true;

  let roleId: string| undefined;
  if (roleChanged) {
    roleId = await getRoleIdByName(values.role);
    if (!roleId) {
      return {error: ERROR_MSG}
    }
  } 

  const nameChanged = values.name === "" ? false : true;
  if (nameChanged) {
    user.name = values.name
  }
  const emailChanged = values.email === "" || !values.email ? false : true
  if (emailChanged) {
    user.email = values.email
  }
  let emailState: Date| null = null;
  if (emailVerChange) {
    if (!user.email_verified) {
      emailState = new Date()
    }
    else {
      emailState = null
    };
  }
  const somethingChanged = emailChanged || nameChanged || emailVerChange || roleChanged;

  if(!somethingChanged) return {notice: "Nic se nezměnilo"}
  if ((!emailVerChange && !roleChanged) && somethingChanged) {
    await db.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email
      }
    })
    return {success: CHANGED}
  }

  if (emailVerChange && roleChanged) {
    await db.user.update({
      where: {id},
      data: {
        name: user.name,
        email: user.email,
        roleId: roleId,
        emailVerified: emailState
      }
    })
    return {success: CHANGED}
  }

  if(emailVerChange) {
    await db.user.update({
      where: {id},
      data: {
        name: user.name,
        email: user.email,
        emailVerified: emailState
      }
    })
    return {success: CHANGED}
  }

  if (roleChanged) {
    await db.user.update({
      where: {id},
      data: {
        name: user.name,
        email: user.email,
        roleId: roleId
      }
    })
    return {success: CHANGED}
  }



}