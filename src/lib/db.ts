import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | undefined;

const initializePrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

export const db = initializePrismaClient();
