import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register user (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should register a new user", async () => {
        const response = await request(app.server).post("/users").send({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "1234567"
        })

        expect(response.statusCode).toEqual(201);
    });
});