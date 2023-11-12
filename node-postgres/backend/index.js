const express = require('express');
const app = express();
const dotenv = require('dotenv');

const userRoutes = require('../backend/routes/userRoutes');
const foodsRoutes = require('../backend/routes/foodsRoutes');
const beerRoutes = require('../backend/routes/beersRoutes');
const winesRoutes = require('./routes/winesRoutes');

dotenv.config();

//use environmental variables for port configuartion
const port = process.env.SERVER_PORT;

//enable JSON parsing
app.use(express.json());

//connection to user routes
app.use('/users', userRoutes);
//connection to food routes
app.use('/foods', foodsRoutes);
//connection to beer routes
app.use('/beers', beerRoutes);
//connection to wines routes
app.use('/wines', winesRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
