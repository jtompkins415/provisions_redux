//Model to handle OrderItem CRUD

const db = require('../db');

class OrderItem {

    constructor(id, order_id, food_id, wine_id, beer_id, quantity, price ){
        this.id = id;
        this.order_id = order_id;
        this.food_id = food_id;
        this.wine_id = wine_id;
        this.beer_id = beer_id;
        this.quantity = quantity;
        this.price = price;
    }

    static async getAllOrderItems(){
        const allItems = await db.query(`SELECT * FROM order_items`);

        if(!allItems || allItems.rows.length === 0){
            throw new Error('NO ITEMS FOUND');
        }

        return allItems.rows.map(item => new OrderItem(item.id, item.order_id, item.food_id, item.wine_id, item.beer_id, item.quantity, item.price));
    };

    static async getOrderItemById(id){
        const item = await db.query(`SELECT * FROM order_items WHERE id=$1`, [id]);

        if(!item || item.rows.length === 0){
            throw new Error('INVALID ITEM ID');
        };

        const itemData = item.rows[0];

        return new OrderItem(itemData.id, itemData.order_id, itemData.food_id, itemData.wine_id, itemData.beer_id, itemData.quantity, itemData.price);
    };

    static async getItemsByOrderId(order_id){
        const orderItems = await db.query(`SELECT * FROM order_items WHERE order_id=$1`, [order_id]);

        if(!orderItems || orderItems.rows.length === 0){
            throw new Error('INVALID ORDER ID');
        };

        return orderItems.rows.map(orderItem => new OrderItem(orderItem.id, orderItem.order_id, orderItem.food_id, orderItem.wine_id, orderItem.beer_id, orderItem.quantity, orderItem.price));

    }
};

module.exports = OrderItem;