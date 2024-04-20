import { PrismaClient, type User } from "@prisma/client";
import { SignUpSchema } from "../middlewares/validator";
const prisma = new PrismaClient();

export const registerNewUser = async (user: SignUpSchema) => {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {}
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {}
};

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUser = async (id: string, user: Partial<User>) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
