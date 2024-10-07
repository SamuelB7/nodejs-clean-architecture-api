import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },
    sign: {
        expiresIn: "10m"
    }
})
app.register(fastifyCookie)
app.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'Gym API',
            description: 'API documentation for the Gym management system',
            version: '1.0.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
});

app.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
});
app.register(usersRoutes)

app.setErrorHandler((error, request, reply) => {
    console.error(error)
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation error", issues: error.format() })
    }

    if (env.NODE_ENV !== "production") {
        console.error(error)
    }

    return reply.status(500).send({ message: "Internal server error" })
});