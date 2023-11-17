const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

const testFood = {
    name: 'testFood',
    category: 'testCategory',
    price: 1.99,
    description: 'A Food Item'
}

describe('Food Routes', () => {
    beforeEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM foods`);
        const response = await request(app).post('/foods/create').send(testFood);
        global.testFood = response.body;
    });

    afterEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM foods`);
    });

    test('POST /foods/create should return new foodItem', async () => {
        const newFoodItem = {
            name: 'NEWItem',
            category: 'NEWCategory',
            price: 3.49,
            description: 'A NEW food Item'
        };

        const response = await request(app).post('/foods/create').send(newFoodItem);
        expect(response.statusCode).toBe(201);
        const createdFoodItem = {...newFoodItem, id: response.body.id};
        expect(response.body).toEqual(createdFoodItem);
    });

    afterAll(async () => {
        await db.end();
    })
});