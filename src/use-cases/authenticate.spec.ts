import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memeory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe("Authenticate use case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateUseCase = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate a user', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: await hash('1234567', 7)
        })

        const { user } = await authenticateUseCase.execute({
            email: 'johndoe@email.com',
            password: '1234567'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: await hash('1234567', 7)
        })

        await expect(() =>
            authenticateUseCase.execute({
                email: 'anotheremail@email.com',
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: await hash('1234567', 7)
        })

        await expect(() =>
            authenticateUseCase.execute({
                email: 'johndoe@email.com',
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
});