const express = require('express');
const { authenticate } = require("../middlewares/authMiddleware");
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const router = express.Router();


router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.put('/:id', authenticate, updateOrder);
router.delete('/:id', authenticate, deleteOrder);

module.exports = router;


