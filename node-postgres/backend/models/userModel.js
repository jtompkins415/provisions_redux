// Class to handlle users table CRUD
const db = require("../db");

class User {

    constructor (id, username, email, first_name, last_name, password, city, state) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.city = city;
        this.state = state;
    }

    //GET ALL USERS
    static async getAllUsers(){
        const result = await db.query(`SELECT id, username, email, first_name, last_name, password, city, state FROM users`);
        return result.rows.map(user => new User(user.id, user.username, user.email, user.first_name, user.last_name, user.password, user.city, user.state));
    }

    //GET USER BY USERNAME
    static async getUserByUsername(username){
        const result = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
        if(result.rows.length === 0){
            throw new Error('INVALID USER!');
        };

        const userData = result.rows[0];
        
        return new User(userData.id, userData.username, userData.email, userData.first_name, userData.last_name, userData.password, userData.city, userData.state);
    };

    //CREATE USER
    static async createUser(username, email, first_name, last_name, password, city, state){
        const result = await db.query(`INSERT INTO users (username, email, first_name, last_name, password, city, state) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, [username, email, first_name, last_name, password, city, state]);

        let {id} = result.rows[0];
        return new User(id, username, email, first_name, last_name, password, city, state );
    };

    //UPDATE USER
    async updateUserField(field, value){
        const validFields = ['username', 'email', 'first_name', 'last_name', 'password', 'city', 'state'];

        if(!validFields.includes(field)){
            throw new Error('Invalid field for update');
        };

        const updateQuery = `UPDATE users SET ${field}=$1 WHERE id=$2`;
        await db.query(updateQuery, [value, this.id]);
    };

    //DELETE USER
    async deleteUser(){
        await db.query(`DELETE FROM users WHERE id=$1`, [this.id]);
    }
    
}

module.exports = User;