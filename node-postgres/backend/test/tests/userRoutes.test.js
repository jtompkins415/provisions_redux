const request = require('supertest');
const app = require('../../app');

describe('User routes', () => {
    beforeAll(async () => {
        await global.__DB_CONN__.query(`DELETE FROM users`);
    });

    test('GET /users should return an empty array initially', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    })

    afterAll(async () => {
        await global.__DB_CONN__.query(`DELETE FROM users`);
    });
});