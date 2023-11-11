//Class to handle foods table CRUD

const db = require('../db');

class FoodItem {

    constructor(id, name, category, price, description){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    };

    //GET ALL FOODS
    static async getAllFoods(){
        const allFoods = await db.query(`SELECT * FROM foods`);

        if(allFoods.rows.length === 0){
            throw new Error('NO FOOD ITEMS IN STOCK');
        }

        return allFoods.rows.map(food => new FoodItem(food.id, food.name, food.category, food.price, food.description));
    };

    //GET FOOD ITEM BY ID
    static async getFoodItemById(id){
        const food = await db.query(`SELECT * FROM foods WHERE id=$1`, [id])

        if(food.rows.length == 0){
            throw new Error('INVALID FOOD ITEM');
        }

        const foodData = food.rows[0];

        return new FoodItem(foodData.id, foodData.name, foodData.category, foodData.price, foodData.description);
    };

    //CREATE FOOD ITEM
    static async createFoodItem(name, category, price, description){
        const newFoodItem = await db.query(`INSERT INTO foods (name, category, price, description) VALUES ($1, $2, $3, $4) RETURNING id`, [name, category, price, description]);

        if(!newFoodItem.rows || newFoodItem.rows.length === 0){
            throw new Error('ERROR IN FOOD ITEM CREATION');
        } 
        
        let {id} = newFoodItem.rows[0];

        return new FoodItem(id, name, category, price, description);
    };

    //UPDATE FOOD ITEM
    async updateFoodItem(field, value){
        const validFields = ['name', 'category', 'price', 'description'];

        if(!validFields.includes(field)){
            throw new Error('INVALID FIELD TO UPDATE');
        }

        const updateQuery = `UPDATE foods SET ${field}=$1 WHERE id=$2`;
        await db.query(updateQuery, [value, this.id]);
    };

    //DELETE FOOD ITEM
    async deleteFoodItem(){
        await db.query(`DELETE FROM foods WHERE id=$1`, [this.id]);
    };
};

module.exports = FoodItem;