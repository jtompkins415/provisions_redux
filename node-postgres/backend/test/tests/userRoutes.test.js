const request = require('supertest');
const db = require('../../db');
const User = require('../../models/userModel');
const app = require('../../app');


const testUser = {
    username: 'testUser',
    email: 'testUser@test.com',
    password: 'test123',
    first_name: 'Test',
    last_name: 'User',
    city: 'Test City',
    state: 'Test State'
};

describe('User routes', () => {
    beforeEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM users`);
        const response = await request(app).post('/users/create').send(testUser);
        global.testUser = response.body;
    });

    afterEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM users`);
    });

    test('POST /users/create should return new user', async () => {
        const newUser = {
            username: 'NEWUser',
            email: 'NEWUser@test.com',
            password: 'NEW123',
            first_name: 'NEW',
            last_name: 'User',
            city: 'NEW City',
            state: 'NEW State'
        }
        const response = await request(app).post('/users/create').send(newUser);
        expect(response.statusCode).toBe(201);
        const createdUser = {...newUser, id: response.body.id};
        expect(response.body).toEqual(createdUser);
    });

    test('GET /users should return an array with all user', async () => {

        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('PATCH /users/update/:id/:field should return confirmation of the update', async () => {
        expect(global.testUser).toBeDefined();

        const response = await request(app).patch(`/users/update/${global.testUser.id}/username`).send({
            username: 'testUserUpdated'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `username updated successfully`});

    });

    test('DELETE /users/remove/:id should return confirmation of the removal', async () => {
        expect(global.testUser).toBeDefined();

        const response = await request(app).delete(`/users/remove/${global.testUser.id}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `${global.testUser.username} deleted`});
    })

    afterAll(async () => {
        await db.end();
    })
});