const express = require('express');
const app = express();
const dotenv = require('dotenv');

const userRoutes = require('../backend/routes/userRoutes');
const foodsRoutes = require('../backend/routes/foodsRoutes');

dotenv.config();

//use environmental variables for port configuartion
const port = process.env.SERVER_PORT;

//enable JSON parsing
app.use(express.json());

//connection to user routes
app.use('/users', userRoutes)
//connection to food routes
app.use('/foods/', foodsRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
