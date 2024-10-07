import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("user profile (e2e)", () => {

    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it("should create a user profile", async () => {
        const { token } = await createAndAuthenticateUser(app);

        const response = await request(app.server).get("/profile").set('Authorization', `Bearer ${token}`).send()
        console.log(response.body)
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining({
            email: "johndoe@email.com",
        }));
    });
});