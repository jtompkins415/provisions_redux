const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const foodsRoutes = require('./routes/foodsRoutes');
const beerRoutes = require('./routes/beersRoutes');
const winesRoutes = require('./routes/winesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

//enable JSON parsing
app.use(express.json());
//enable CORS
app.use(cors());

//connection to user routes
app.use('/users', userRoutes);
//connection to food routes
app.use('/foods', foodsRoutes);
//connection to beer routes
app.use('/beers', beerRoutes);
//connection to wines routes
app.use('/wines', winesRoutes);
//connection to orders routes
app.use('/orders', ordersRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});


module.exports = app;