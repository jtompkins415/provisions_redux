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
