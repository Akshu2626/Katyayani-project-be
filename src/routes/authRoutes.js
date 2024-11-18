const express = require('express');
const { singin, singup } = require('../controllers/authController')
const routers = express.Router();

routers.post('/singup', singup);
routers.post('/singin', singin);


module.exports = routers;


