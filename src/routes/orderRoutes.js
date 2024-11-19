const express = require('express');
const { authenticate } = require("../middlewares/authMiddleware");
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const router = express.Router();


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 description: Name of the customer
 *                 example: "John Doe"
 *               customerEmail:
 *                 type: string
 *                 description: Email address of the customer
 *                 example: "john.doe@example.com"
 *               books:
 *                 type: array
 *                 description: List of books with their IDs and quantities
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       description: ID of the book
 *                       example: "60bd5b2e8e4e5c6d48e4fa92"
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the book
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Order ID
 *                   example: "60bd5b2e8e4e5c6d48e4fa92"
 *                 customerName:
 *                   type: string
 *                   description: Name of the customer
 *                   example: "John Doe"
 *                 customerEmail:
 *                   type: string
 *                   description: Email address of the customer
 *                   example: "john.doe@example.com"
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookId:
 *                         type: string
 *                         description: ID of the book
 *                         example: "60bd5b2e8e4e5c6d48e4fa92"
 *                       quantity:
 *                         type: number
 *                         description: Quantity of the book
 *                         example: 2
 *       400:
 *         description: Invalid request or missing parameters
 *       404:
 *         description: Some books are not found in inventory
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, createOrder);


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve orders with optional filters
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: customerName
 *         required: false
 *         schema:
 *           type: string
 *         description: The name of the customer to filter orders by
 *         example: "John Doe"
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: The status of the order to filter by (e.g., 'pending', 'shipped')
 *         example: "shipped"
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date of the orders to filter by
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date of the orders to filter by
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The order ID
 *                     example: "60bd5b2e8e4e5c6d48e4fa92"
 *                   customerName:
 *                     type: string
 *                     description: The name of the customer
 *                     example: "John Doe"
 *                   customerEmail:
 *                     type: string
 *                     description: The email of the customer
 *                     example: "john.doe@example.com"
 *                   status:
 *                     type: string
 *                     description: The status of the order
 *                     example: "shipped"
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the order was created
 *                     example: "2024-10-20T10:00:00Z"
 *                   books:
 *                     type: array
 *                     description: List of books in the order
 *                     items:
 *                       type: object
 *                       properties:
 *                         bookId:
 *                           type: string
 *                           description: ID of the book
 *                           example: "60bd5b2e8e4e5c6d48e4fa92"
 *                         quantity:
 *                           type: number
 *                           description: Quantity of the book ordered
 *                           example: 2
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, getOrders);


/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an existing order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *         example: "60bd5b2e8e4e5c6d48e4fa92"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the order (e.g., 'shipped', 'pending')
 *                 example: "shipped"
 *               books:
 *                 type: array
 *                 description: The updated list of books in the order
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       description: The ID of the book
 *                       example: "60bd5b2e8e4e5c6d48e4fa92"
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the book
 *                       example: 2
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The order ID
 *                   example: "60bd5b2e8e4e5c6d48e4fa92"
 *                 customerName:
 *                   type: string
 *                   description: The name of the customer
 *                   example: "John Doe"
 *                 customerEmail:
 *                   type: string
 *                   description: The email of the customer
 *                   example: "john.doe@example.com"
 *                 status:
 *                   type: string
 *                   description: The updated status of the order
 *                   example: "shipped"
 *                 orderDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date when the order was created
 *                   example: "2024-10-20T10:00:00Z"
 *                 books:
 *                   type: array
 *                   description: List of books in the order
 *                   items:
 *                     type: object
 *                     properties:
 *                       bookId:
 *                         type: string
 *                         description: ID of the book
 *                         example: "60bd5b2e8e4e5c6d48e4fa92"
 *                       quantity:
 *                         type: number
 *                         description: Quantity of the book ordered
 *                         example: 2
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, updateOrder);


/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete
 *         example: "60bd5b2e8e4e5c6d48e4fa92"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Order deleted successfully."
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, deleteOrder);

module.exports = router;


