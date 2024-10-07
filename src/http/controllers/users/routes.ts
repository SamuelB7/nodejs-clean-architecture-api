import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { authenticateController } from "./authenticate.controller";
import { profileController } from "./profile.controller";
import { refreshController } from "./refresh.controller";
import { registerController } from "./register.controller";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', {
        schema: {
            description: 'Register a new user',
            summary: 'Register a new user',
            tags: ['User'],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['name', 'email', 'password']
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' }
                    }
                }
            }
        }
    }, registerController)

    app.post('/auth', {
        schema: {
            description: 'Authenticate a user',
            summary: 'Authenticate a user',
            tags: ['User'],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['email', 'password']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }
                    }
                }
            }
        }
    }, authenticateController)

    app.patch('/token/refresh', {
        schema: {
            description: 'Refresh JWT token',
            summary: 'Refresh JWT token',
            tags: ['User'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }
                    }
                }
            }
        }
    }, refreshController)

    app.get('/profile', {
        onRequest: [verifyJWT],
        schema: {
            description: 'Get user profile',
            summary: 'Get user profile',
            tags: ['User'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' }
                    }
                }
            }
        }
    }, profileController)
}