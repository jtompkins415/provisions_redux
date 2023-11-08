// Class to handlle user CRUD
const db = require("../db");

class User {

    constructor (id, name, email, firstName, lastName, password, city, state) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.city = city;
        this. state = state;
    }

    //Get all the users from the database
    static async getAllUsers(){
        const result = await db.query(`SELECT * FROM users`)
        return result.rows.map(user => new User(user.id, user.name, user.email, user.firstName, user.lastName, user.password, user.city, user.state))
    }



}

module.exports = User;