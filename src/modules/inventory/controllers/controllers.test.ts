import request from "supertest";
import express from "express";
import mockConnection from "../../../tests/mockConnection";
import router from "../routes";
import bodyParser from "body-parser";

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

describe("InventoryController", () => {
    let connection;

    beforeAll(async () => {
        connection = await mockConnection.create();
    });

    afterAll(async () => {
        await mockConnection.clear();
        await mockConnection.close();
    });

    let expiry = new Date().getTime() + 100000;
    it("GET /:item/quantity - success", async () => {
        const response = await request(app).get("/food/quantity");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ quantity: 0, validTill: null });
    })

    it("POST /:item/add - success", async () => {
        const response = await request(app).post("/food/add").send({ expiry, quantity: 10 });
        expect(response.status).toBe(201)
        expect(response.body).toEqual({});
    })

    it("POST /:item/add - failure", async () => {
        const response = await request(app).post("/food/add").send({ expiry });
        expect(response.status).toBe(400);
    })

    it("GET /:item/quantity - success", async () => {
        const response = await request(app).get("/food/quantity");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ quantity: 10, validTill: expiry });
    })

    it("POST /:item/sell - success", async () => {
        const response = await request(app).post("/food/sell").send({ quantity: 10 });
        expect(response.status).toBe(200)
        expect(response.body).toEqual({});
    })

    it("POST /:item/sell - failure", async () => {
        const response = await request(app).post("/food/sell").send({});
        expect(response.status).toBe(400);
    })

});