//Model to handle Orders Table CRUD

const db = require('../db');
const OrderItem = require('./orderItemModel');

class Order{
    
    constructor(id, user_id, total_price, order_date){
        this.id = id;
        this.user_id = user_id;
        this.total_price = total_price;
        this.order_date = order_date;
    }

    static async getAllOrders(){
        const allOrders = await db.query('SELECT * FROM orders');
        
        if(!allOrders || allOrders.rows.length === 0){
            throw new Error('NO VALID ORDERS');
        }

        return allOrders.rows.map(order => new Order(order.id, order.user_id, order.total_price, order.order_date));
    };

    static async getOrderById(id){
        const order = await db.query(`SELECT * FROM orders WHERE id=$1`, [id]);

        if(!order || order.rows.length === 0){
            throw new Error('INVALID ORDER');
        }

        const orderData = order.rows[0];

        return new Order(orderData.id, orderData.user_id, orderData.total_price, orderData.order_date);
    };

    static async getOrdersByUser(user_id){
        const userOrders = await db.query(`SELECT * FROM orders WHERE user_id=$1`, [user_id]);

        if(!userOrders || userOrders.rows.length === 0){
            throw new Error('INVALID USER ID')
        }

        return userOrders.rows.map(order => new Order(order.id, order.user_id, order.total_price, order.order_date));
    }

    static async createOrder(user_id, total_price, order_date){
        const newOrder = await db.query(`INSERT into orders (user_id, total_price, order_date) VALUES ($1, $2, $3) RETURNING id`, [user_id, total_price, order_date]);

        if(!newOrder.rows || newOrder.rows.length === 0){
            throw new Error('ERROR IN ORDER CREATION');
        }

        let {id} = newOrder.rows[0];

        return new Order(id, user_id, total_price, order_date);
    };

    async getItemsFromOrder(){
        const items = await OrderItem.getItemsByOrderId(this.id);

        if(!items || items.length === 0){
            throw new Error('INVALID ORDER ID OR NO ITEMS AVAILABLE')
        }

        return items;
    }
    
    async deleteOrder(){
        await db.query(`DELETE from orders WHERE id=$1`, [this.id]);
    }
};

module.exports = Order;