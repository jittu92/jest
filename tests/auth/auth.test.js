const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

/* Connecting to the database before each test. */
    beforeAll( () => {
        mongoose.connect(process.env.MONGODB_URI, {
            dbName:process.env.MONGO_DATABASE
        });
    });
/* Connecting to the database before each test. */

/* Closinh to the database after all test. */
    afterAll( () => {
         mongoose.connection.close();
    });
/* Closinh to the database after all test. */


describe("POST /api/auth/signin", () => {
    it("Testing with proper credential", async () => {
        const res = await request(app).post("/api/auth/signin").send({
            "username": "super",
            "password": "Helame78%"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Successfully Logged In");
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0].name).toBe("Super Admin");
        expect(res.body.data[0].username).toBe("super");
        expect(res.body.data[0].email_id).toBe("debabrataroy@yopmail.com");
    });
    it("Testing with wrong username ", async () => {
        const res = await request(app).post("/api/auth/signin").send({
            "username": "supers",
            "password": "Helame78%"
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Wrong Username");
        expect(res.body.data.length).toBe(0);
    });
    it("Testing with wrong password ", async () => {
        const res = await request(app).post("/api/auth/signin").send({
            "username": "super",
            "password": "abcdfA#"
        });
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Wrong Password");
        expect(res.body.data.length).toBe(0);
    });
});

