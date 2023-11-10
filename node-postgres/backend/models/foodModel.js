//Class to handle foods table CRUD

const db = require('../db');

class FoodItem {

    constructor(id, name, category, price, description){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }

    //GET ALL FOODS
    static async getAllFoods(){
        const allFoods = await db.query(`SELECT * FROM foods`);

        if(allFoods.rows.length === 0){
            throw new Error('NO FOOD ITEMS IN STOCK');
        }

        return allFoods.rows.map(food => new FoodItem(food.id, food.name, food.category, food.price, food.description));
    }
};

module.exports = FoodItem;