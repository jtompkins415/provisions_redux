const express = require('express');
const app = express();
const dotenv = require('dotenv');

const userRoutes = require('../backend/routes/userRoutes');

dotenv.config();

const port = process.env.SERVER_PORT;

//connection to user routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
