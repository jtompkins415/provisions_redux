//Setup Jest test environment
const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_ENV === 'test') {
  DB_URI = 'postgresql:///provisions_redux_db_test';
} else {
  DB_URI = 'postgresql:///provisions_redux_db';
}

global.__DB_CONN__ = new Client({
  connectionString: DB_URI,
});

beforeAll(async () => {
  await global.__DB_CONN__.connect();
});

afterAll(async () => {
  await global.__DB_CONN__.end();
});