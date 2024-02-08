import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const initializePrismaClient = () => {
  if (typeof global.prisma === 'undefined') {
    global.prisma = new PrismaClient();
  }
  return global.prisma;
};

export const db = initializePrismaClient();
