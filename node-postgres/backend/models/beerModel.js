//Class to handle beers table CRUD

const db = require('../db');

class Beer {

    constructor(id, beer_name, beer_label, brewery, beer_style, price, beer_abv, description){
        this.id = id;
        this.beer_name = beer_name;
        this.beer_label = beer_label;
        this.brewery = brewery;
        this.beer_style = beer_style;
        this.price = price;
        this.beer_abv = beer_abv;
        this.description = description;
    };

    //GET ALL BEERS
    static async getAllBeers(){
        const beers = await db.query(`SELECT * FROM beers`);
        
        if(beers.rows.length === 0){
            throw new Error('NO BEER ITEMS IN STOCK');
        };

        return beers.rows.map(beer => new Beer(beer.id, beer.beer_name, beer.beer_label, beer.brewery, beer.beer_style, beer.price, beer.beer_abv, beer.description));
    };

    //GET BEER BY ID
    static async getBeerById(id){
        const beer = await db.query(`SELECT * FROM beers WHERE id=$1`, [id]);

        if(beer.rows.length === 0){
            throw new Error('INVALID BEER ID');
        };

        const beerData = beer.rows[0];

        return new Beer(beerData.id, beerData.beer_name, beerData.beer_label, beerData.brewery, beerData.beer_style, beerData.price, beerData.beer_abv, beerData.description);
    };

    //CREATE BEER
    static async createBeer(beer_name, beer_label, brewery, beer_style, price, beer_abv, description){
        const newBeer = await db.query(`INSERT INTO beers (beer_name, beer_label, brewery, beer_style, price, beer_abv, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, [beer_name, beer_label, brewery, beer_style, price, beer_abv, description]);

        if(!newBeer.rows || newBeer.rows.length === 0){
            throw new Error('ERROR IN USER CREATION');
        };

        let {id} = newBeer.rows[0];

        return new Beer(id, beer_name, beer_label, brewery, beer_style, price, beer_abv, description);
    };

    //UPDATE BEER
    async updateBeer(field, value){
        const validFields = ['beer_name', 'beer_label', 'brewery', 'beer_style', 'price', 'beer_abv', 'description'];

        if(!validFields.includes(field)){
            throw new Error('INVALID FIELD TO UPDATE');
        }

        const updateQuery = `UPDATE beers SET ${field}=$1 WHERE id=$2`;
        await db.query(updateQuery, [value, this.id]);
    };

    //DELETE BEER
    async deleteBeer(){
        await db.query(`DELETE FROM beers WHERE id=$1`, [this.id]);
    };
};


module.exports = Beer;