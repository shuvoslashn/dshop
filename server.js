import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';

// configure
dotenv.config();

// rest object
const app = express();

// check api
app.get('/', (req, res) => {
    res.json({ message: 'welcome to ecommerce app' });
});

// port
const PORT = process.env.PORT || 8080;

// server listening
app.listen(PORT, () => {
    console.log(` server running at ${PORT} `.bgCyan);
});
