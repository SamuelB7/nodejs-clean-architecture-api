import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            data
        });
    }

    async findAll() {
        return await prisma.user.findMany();
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id: string) {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: string) {
        return await prisma.user.delete({
            where: {
                id
            }
        });
    }
}