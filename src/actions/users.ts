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
  const roleName = await getRoleNameById(user.roleId);
  if (!roleName) {
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

export const removeUser = async (userId: string) => {
  removeUserById(userId);
}

export const updateUser = async (user: UserData, values: z.infer<typeof UserEditSchema>) => {

  const id = user.id;

  var emailVerChange;
  if (!user.OAuth) {
    emailVerChange = user.email_verified === values.emailVer ? false : true;
  } else {
    emailVerChange = false;
  }
  const roleChanged = values.role === user.role_name || !values.role ? false : true;

  var roleId;
  if (roleChanged) {
    roleId = await getRoleIdByName(values.role);
    if (!roleId) {
      return {error: ERROR_MSG}
    }
  } 

  var nameChanged = values.name === "" ? false : true;
  if (nameChanged) {
    user.name = values.name
  }
  var emailChanged = values.email === "" || !values.email ? false : true
  if (emailChanged) {
    user.email = values.email
  }
  var emailState;
  if (emailVerChange) {
    if (!user.email_verified) {
      emailState = new Date()
      console.log(emailState)
    }
    else {
      emailState = null
    };
  }
  const somethingChanged = emailChanged || nameChanged || emailVerChange || roleChanged;

  if(!somethingChanged) return {notice: "Nic se nezměnilo"}
  console.log("E:" + emailChanged,"N:" + nameChanged,"EV:" + emailVerChange,"R:" + roleChanged)
  if ((!emailVerChange && !roleChanged) && somethingChanged) {
    console.log(user.name,user.email)
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