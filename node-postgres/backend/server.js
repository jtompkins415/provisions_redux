const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

//use environmental variables for port configuartion
const port = process.env.SERVER_PORT;


app.listen(port, () => {
    console.log(`App running on port ${port}`)
});