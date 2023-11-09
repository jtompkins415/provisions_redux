// Class to handlle user CRUD
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

    //Get all the users from the database
    static async getAllUsers(){
        const result = await db.query(`SELECT id, username, email, first_name, last_name, password, city, state FROM users`)
        return result.rows.map(user => new User(user.id, user.username, user.email, user.first_name, user.last_name, user.password, user.city, user.state))
    }

    
}

module.exports = User;