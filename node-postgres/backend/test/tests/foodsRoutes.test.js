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

    test('GET /foods should return an array with all food items', async () => {

        const response = await request(app).get('/foods');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach((food) => {
            expect(food).toHaveProperty('name');
            expect(food).toHaveProperty('category');
            expect(food).toHaveProperty('price');
            expect(food).toHaveProperty('description');
        });
    });

    test('PATCH /foods/update/:id/:field should return confirmation of the field being successfully updated', async () => {
        expect(global.testFood).toBeDefined();

        const response = await request(app).patch(`/foods/update/${global.testFood.id}/price`).send({
            price: 3.49
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'price updated successfully'});
    });

    test('DELETE /foods/remove/:id should return confirmation of food item removal', async () => {
        expect(global.testFood).toBeDefined();

        const response = await request(app).delete(`/foods/remove/${global.testFood.id}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `${global.testFood.name} removed successfully`});
    });

    afterAll(async () => {
        await db.end();
    });
});