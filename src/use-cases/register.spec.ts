import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memeory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserExistsError } from './errors/user-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe("Register use case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    it('should be able to register a new user', async () => {
        const user = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234567'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password', async () => {
        const user = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234567'
        })

        const isPasswordHashed = await compare('1234567', user.password)

        expect(isPasswordHashed).toBe(true)
    })

    it('should not be able to register a users with same email', async () => {
        const email = 'johndoe@email.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '1234567'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '1234567'
            })
        ).rejects.toBeInstanceOf(UserExistsError)
    })
})