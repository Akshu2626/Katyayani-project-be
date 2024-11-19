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

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("Swagger docs available at: http://localhost:5000/api-docs");


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;
