import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should authenticate a user", async () => {
        await request(app.server).post("/users").send({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "1234567"
        })

        const response = await request(app.server).post("/auth").send({
            email: "johndoe@email.com",
            password: "1234567"
        })


        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    });
});