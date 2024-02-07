"use server"

import { getNthUsers, getUsersCount } from "@/data/user"

export const countUsers = async () => {
  const countResult = await getUsersCount()
  return countResult;
}

export const getNUsers = async (take: number, page: number) => {
  const Users = await getNthUsers(take, page)
  return Users;
}