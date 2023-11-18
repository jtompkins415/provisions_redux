const request = require('supertest');
const app = require('../../app');
const db = require('../../db');

const testWine = {
    wine_name: "TESTWine",
    winery: "TESTWinery",
    wine_style: "TESTStyle",
    vintage: "TESTVintage",
    price: 25.99,
    abv: 13.5,
    description: "A Test Wine"
};

describe('Wine Routes', () => {
    beforeEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM wines`);
        const response = await request(app).post('/wines/create').send(testWine);
        global.testWine = {...testWine, id: response.body.id};
    });

    afterEach(async () => {
        await global.__DB_CONN__.query(`DELETE FROM wines`);
    });

    test('POST /wines/create should return new wine object', async () => {
        const newWine = {
            wine_name: "NEWWine",
            winery: "NEWWinery",
            wine_style: "NEWStyle",
            vintage: "NEWVintage",
            price: 28.99,
            abv: 12.5,
            description: "A New Wine"
        };

        const response = await request(app).post('/wines/create').send(newWine);
        expect(response.statusCode).toBe(201);
        const createdWine = {...newWine, id: response.body.id};
        expect(response.body).toEqual(createdWine);
    });

    test('GET /wines should return an array of all wine objects', async () => {
        const response = await request(app).get('/wines');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach((wine) => {
            expect(wine).toHaveProperty('wine_name');
            expect(wine).toHaveProperty('winery');
            expect(wine).toHaveProperty('wine_style');
            expect(wine).toHaveProperty('vintage');
            expect(wine).toHaveProperty('price');
            expect(wine).toHaveProperty('abv');
            expect(wine).toHaveProperty('description');
        });
    });

    test('PATCH /wines/update/:id/:field should return a confirmation of a successful update', async () => {
        expect(global.testWine).toBeDefined();
        
        const response = await request(app).patch(`/wines/update/${global.testWine.id}/winery`).send({
            winery: 'UpdatedBrewery'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: 'winery updated successfully'});
    });

    test('DELETE /wines/remove/:id should return a confirmation of a successful removal', async () => {
        expect(global.testWine).toBeDefined();

        const response = await request(app).delete(`/wines/remove/${global.testWine.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: `${global.testWine.wine_name} removed successfully`});
    });

    afterAll(async () => {
        await db.end();
    })
})