//Class for wines table CRUD

const db = require('../db');

class Wine {

    constructor(id, wine_name, winery, wine_style, vintage, price, abv, description){
        this.id = id;
        this.wine_name = wine_name;
        this.winery = winery;
        this.wine_style = wine_style;
        this.vintage = vintage;
        this.price = price;
        this.abv = abv;
        this.description = description;
    };

    //GET ALL WINES
    static async getAllWines(){
        const wines = await db.query(`SELECT * FROM wines`);
        
        if(wines.rows.length === 0){
            throw new Error('NO WINES IN STOCK');
        };

        return wines.rows.map(wine => new Wine(wine.id, wine.wine_name, wine.winery, wine.wine_style, wine.vintage, wine.price, wine.abv, wine.description));
    };

    //GET WINE BY ID
    static async getWineById(id){
        const wine = await db.query(`SELECT * FROM wines WHERE id=$1`, [id]);

        if(wine.rows.length === 0){
            throw new Error('INVALID WINE ID');
        }

        const wineData = wine.rows[0];

        return new Wine(wineData.id, wineData.wine_name, wineData.winery, wineData.wine_style, wineData.vintage, wineData.price, wineData.abv, wineData.description);
    }

    //CREATE WINE
    static async createWine(wine_name, winery, wine_style, vintage, price, abv, description){
        const newWine = await db.query(`INSERT INTO wines (wine_name, winery, wine_style, vintage, price, abv, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, [wine_name, winery, wine_style, vintage, price, abv, description]);

        if(!newWine.rows || newWine.rows.length === 0){
            throw new Error('ERROR IN WINE CREATION')
        }

        let {id} = newWine.rows[0];

        return new Wine(id, wine_name, winery, wine_style, vintage, price, abv, description);
    };

    //UPDATE WINE
    async updateWine(field, value){
        const validFields = ['wine_name', 'winery', 'wine_style', 'vintage', 'price', 'abv', 'description'];

        if(!validFields.includes(field)){
            throw new Error('INVALID FIELD TO UPDATE');
        }

        const updateQuery = `UPDATE wines SET ${field}=$1 WHERE id=$2`;
        await db.query(updateQuery, [value, this.id]);
    };

    //DELETE WINE
    async deleteWine(){
        await db.query(`DELETE FROM wines WHERE id=$1`, [this.id]);
    };
};

module.exports = Wine;