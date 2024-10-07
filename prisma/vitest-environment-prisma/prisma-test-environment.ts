import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import 'dotenv/config'
import { Environment } from 'vitest/environments'

function generateDatabaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("Please provide a DATABASE_URL environment variable")
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)

    return url.toString()
}

const prisma = new PrismaClient()

export default <Environment><unknown>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseURL(schema)
        process.env.DATABASE_URL = databaseUrl

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" cascade`)
                await prisma.$disconnect()
            },
        }
    },
}