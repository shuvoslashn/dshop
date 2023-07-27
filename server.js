import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

// configure
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// connect DataBase
connectDB();

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
