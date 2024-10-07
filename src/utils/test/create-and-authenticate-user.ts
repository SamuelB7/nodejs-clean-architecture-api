import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin: boolean = false) {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@email.com",
            password: await hash("1234567", 7),
            role: isAdmin ? "ADMIN" : "USER"
        }
    })

    const auth = await request(app.server).post("/auth").send({
        email: "johndoe@email.com",
        password: "1234567"
    })

    const { token } = auth.body

    return {
        token
    }
} 