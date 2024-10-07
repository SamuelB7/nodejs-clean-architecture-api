import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh token (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should refresh a token", async () => {
        await request(app.server).post("/users").send({
            name: "John Doe",
            email: "johndoe@email.com",
            password: "1234567"
        })

        const authResponse = await request(app.server).post("/auth").send({
            email: "johndoe@email.com",
            password: "1234567"
        })

        const cookies = authResponse.get('Set-Cookie');

        if (!cookies) {
            throw new Error("No cookies found in the response");
        }

        const response = await request(app.server)
            .patch("/token/refresh")
            .set('Cookie', cookies)
            .send()


        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    });
});