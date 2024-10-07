import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user: User = {
            id: randomUUID(),
            name: data.name ? data.name : '',
            email: data.email,
            role: data.role ? data.role : 'USER',
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.users.push(user)

        return user
    }

    async findAll(): Promise<User[]> {
        return this.users
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        let user = this.users.find(user => user.id === id)
        user = data as User
        const index = this.users.findIndex(user => user.id === id)
        this.users[index] = user
        return user
    }

    async delete(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id) || null
        const index = this.users.findIndex(user => user.id === id)
        this.users.splice(index, 1)
        return user
    }
}