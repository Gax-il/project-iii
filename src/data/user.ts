import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    return user;
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      }
    })
    return user;
  } catch {
    return null
  }
}

export const getUsersCount = async () => {
  const count = await db.user.count()

  return count;
}

export const getNthUsers = async (take: number, page: number) => {
  const users = await db.user.findMany({
    take: take,
    skip: (page - 1) * take,
  })

  return users;
}

export const removeUserById = async (userID: string) => {
  const removed = await db.user.delete({
    where: {
      id: userID
    }
  })
}