import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserExistsError } from "./errors/user-exists-error"

type RegisterUseCaseParams = {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute(data: RegisterUseCaseParams) {
        const { name, email, password } = data
        const passwordHash = await hash(password, 7)

        const userExists = await this.usersRepository.findByEmail(email)

        if (userExists) {
            throw new UserExistsError()
        }

        return await this.usersRepository.create({
            name,
            email,
            password: passwordHash
        })
    }
}