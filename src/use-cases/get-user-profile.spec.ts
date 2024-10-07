import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memeory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { GetUserProfileUseCase } from "./get-user-profile";
import { RegisterUseCase } from "./register";

let usersRepository: InMemoryUsersRepository
let getProfileUseCase: GetUserProfileUseCase
let registerUseCase: RegisterUseCase

describe("Get user profile use case", () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        getProfileUseCase = new GetUserProfileUseCase(usersRepository)
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const user = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '1234567'
        })

        const profile = await getProfileUseCase.execute({ userId: user.id })

        expect(profile.user.id).toEqual(user.id)
    })

    it('should not be able to get user profile with invalid user id', async () => {
        await expect(() =>
            getProfileUseCase.execute({ userId: 'invalid-id' }))
            .rejects.toBeInstanceOf(ResourceNotFoundError)
    })
});