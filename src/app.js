const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;
