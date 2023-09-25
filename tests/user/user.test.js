'use strict';
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
var auth = {
    token: ""
};
/* Connecting to the database before each test. */
beforeAll( () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName:process.env.MONGO_DATABASE
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
    });
});
/* Connecting to the database before each test. */

/* Closinh to the database after all test. */
afterAll( () => {
     mongoose.connection.close();
});
/* Closinh to the database after all test. */

describe('User API', () => {
    let authToken; // This variable will store the bearer token
  
    beforeAll(async () => {
        // You can generate a token here or fetch it from your authentication logic
        // For the purpose of this example, let's assume a simple token generation
        const res = await request(app)
            .post('/api/auth/signin') // Replace with your login route
            .send({
                "username":"super",
                "password":"Helame78%"
            });
        // console.log(res.body);
        authToken = res.body.data[0].token;
    });
  
    describe('GET /api/user/all without Bearer Token', () => {
        it('should return 403 unauthorized', async () => {
            const res = await request(app)
            .get('/api/user/all')
            .expect(403);
    
            // Optionally, you can add more assertions for the response body
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe("No Token Provided");
        });
    });
  
    describe('GET /api/user/all with Bearer Token', () => {
        it('should return a list of users', async () => {
            const res = await request(app)
            .get('/api/user/all')
            .set('Authorization', `Bearer ${authToken}`) // Set the bearer token in the request header
            .expect(200);
    
            // Optionally, you can add assertions for the response body
            // expect(res.body).toHaveLength(/* expected length of user list */);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User Details Found");
            expect(res.body.data.length).toBeGreaterThan(0);
            // Add more specific assertions as needed
        });
    });
});


