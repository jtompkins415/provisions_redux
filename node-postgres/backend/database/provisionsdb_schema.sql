CREATE DATABASE provisions_redux_db;

\c provisions_redux_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    password TEXT NOT NULL,
    city TEXT,
    state TEXT
);

CREATE TABLE IF NOT EXISTS foods (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, 
    price FLOAT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS beers (
    id SERIAL PRIMARY KEY,
    beer_name TEXT NOT NULL,
    beer_label TEXT,
    brewery TEXT,
    beer_style TEXT,
    price FLOAT NOT NULL,
    beer_abv FLOAT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS wines (
    id SERIAL PRIMARY KEY,
    wine_name TEXT,
    winery TEXT,
    wine_style TEXT,
    vintage INTEGER,
    price FLOAT,
    abv FLOAT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  total_price FLOAT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  food_id INTEGER REFERENCES foods(id),
  beer_id INTEGER REFERENCES beers(id),
  wine_id INTEGER REFERENCES wines(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
);

-- SEED DATA FOR USERS TABLE
INSERT INTO users (username, email, first_name, last_name, password, city, state)
VALUES
  ('john_doe', 'john.doe@example.com', 'John', 'Doe', 'password123', 'Cityville', 'Stateville'),
  ('jane_smith', 'jane.smith@example.com', 'Jane', 'Smith', 'securepass', 'Townsville', 'Stateville');

--SEED DATA FOR FOODS TABLE
  INSERT INTO foods (name, category, price, description)
VALUES
  ('Organic Avocado', 'Produce', 2.99, 'Fresh and organic avocado for your healthy meals'),
  ('Artisanal Chocolate', 'Sweets', 5.99, 'Handcrafted chocolate from local artisans');

--SEED DATA FOR BEERS TABLE
  INSERT INTO beers (beer_name, beer_label, brewery, beer_style, price, beer_abv, description)
VALUES
  ('Craft IPA', 'Craft Brewery', 'Local Brew Co.', 'IPA', 6.99, 7.5, 'Bold and hoppy craft IPA'),
  ('Stout Supreme', 'Stout Brews', 'Dark Ales Inc.', 'Stout', 8.99, 8.0, 'Rich and velvety stout with coffee notes');

--SEED DATA FOR WINES TABLE
INSERT INTO wines (wine_name, winery, wine_style, vintage, price, abv, description)
VALUES
  ('Cabernet Sauvignon', 'Vineyard Estates', 'Red Wine', 2018, 19.99, 14.0, 'Full-bodied red wine with dark fruit flavors'),
  ('Chardonnay Reserve', 'Harmony Cellars', 'White Wine', 2020, 15.99, 13.5, 'Elegant and buttery chardonnay');  

-- SEED DATA FOR ORDERS TABLE
INSERT INTO orders (user_id, total_price, order_date)
VALUES
  (1, 15.97, '2023-12-07 08:30:00'), -- Assuming the current date and time
  (2, 24.98, '2023-12-07 09:45:00');

-- SEED DATA FOR ORDER_ITEMS TABLE
INSERT INTO order_items (order_id, food_id, beer_id, wine_id, quantity, price)
VALUES
  (1, 1, NULL, NULL, 3, 8.99),    -- Order 1: 3 Avocado at $8.99 each
  (1, NULL, 2, NULL, 2, 6.99),     -- Order 1: 2 Stout at $6.99 each
  (2, NULL, 2, NULL, 1, 8.99);     -- Order 2: 1 Beer at $8.99 each