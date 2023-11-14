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
    beforeAll(async () => {
        await global.__DB_CONN__.query(`DELETE FROM users`);
    });

    test('GET /users should return an empty array initially', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('POST /users/create should return created user', async () => {
        const response = await request(app).post('/users/create').send(testUser);
        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty('id');
        const createdUser = {...testUser, id: response.body.id};
        expect(response.body).toEqual(createdUser);

        global.createdUser = createdUser;
    });

    test('GET /users should return an array with the created user', async () => {
        expect(global.createdUser).toBeDefined();

        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([global.createdUser]);
    });

    test('PATCH /users/update/:id/:field should return confirmation of the update', async () => {
        expect(global.createdUser).toBeDefined();

        const response = await request(app).patch(`/users/update/${global.createdUser.id}/username`).send({
            username: 'testUserUpdated'
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `username updated successfully`});
    });

    test('DELETE /users/remove/:id should return confirmation of the removal', async () => {
        expect(global.createdUser).toBeDefined();

        const response = await request(app).delete(`/users/remove/${global.createdUser.id}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `${global.createdUser.username} deleted`});
    })

    afterAll(async () => {
        await global.__DB_CONN__.query(`DELETE FROM users`);
        await db.end();
    });
});