//DB CONFIGURATION

const {Client} = require('pg');

let DB_URI;

if(process.env.NODE_ENV === "test"){
    DB_URI = "postgresql:///provisions_redux_db_test";
} else {
    DB_URI = "postgresql:///provisions_redux_db";
};

let db = new Client({
    connectionString: DB_URI
});

db.connect();

module.exports = db;