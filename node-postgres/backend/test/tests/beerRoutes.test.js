const request = require('supertest');
const db = require('../../db');
const app = require('../../app');

const testBeer = {
    beer_name: "TESTBeer",
    beer_label: "TESTLabel",
    brewery: "TESTBrewery",
    beer_style: "TESTStyle",
    price: 8.99,
    beer_abv: 4.51,
    description: "A Test Beer"
};

describe('Beer Routes', () => {
    beforeEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM beers`);
        const response = await request(app).post('/beers/create').send(testBeer)
        global.testBeer = {...testBeer, id: response.body.id};
    });

    afterEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM beers`);
    });

    test('POST /beers/create should return a new beer object', async () => {
        const newBeer = {
            beer_name: "NEWBeer",
            beer_label: "NEWLabel",
            brewery: "NEWBrewery",
            beer_style: "NEWStyle",
            price: 10.99,
            beer_abv: 13.51,
            description: "A New Beer"
        };

        const response = await request(app).post('/beers/create').send(newBeer);
        expect(response.statusCode).toBe(201);
        const createdBeer = {...newBeer, id: response.body.id};
        expect(response.body).toEqual(createdBeer);
    });

    test('GET /beers should return array with beer objects', async () => {
        const response = await request(app).get('/beers');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach((beer) => {
            expect(beer).toHaveProperty('beer_name');
            expect(beer).toHaveProperty('beer_label');
            expect(beer).toHaveProperty('brewery');
            expect(beer).toHaveProperty('beer_style');
            expect(beer).toHaveProperty('price');
            expect(beer).toHaveProperty('beer_abv');
            expect(beer).toHaveProperty('description');
        });
    });

    test('PATCH /beers/update/:id/:field should return confirmation message for successful update', async () => {
        expect(global.testBeer).toBeDefined();

        const response = await request(app).patch(`/beers/update/${global.testBeer.id}/beer_style`).send({
            style: 'DIFFStyle'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'beer_style updated successfully'});
    });

    test('DELETE /beers/remove/:id should return confirmation message for successful removal', async () => {
        expect(global.testBeer).toBeDefined();

        const response = await request(app).delete(`/beers/remove/${global.testBeer.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `${global.testBeer.beer_name} removed successfully`});
    });

    afterAll(async () => {
        await db.end();
    });
});