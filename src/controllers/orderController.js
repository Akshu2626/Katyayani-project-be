const Order = require('../models/orderModel');
const Book = require('../models/bookModel');

// Create a new order
exports.createOrder = async (req, res) => {
    const { customerName, customerEmail, books } = req.body;

    try {
        // Validate if all books exist
        const bookIds = books.map((book) => book.bookId);
        const foundBooks = await Book.find({ _id: { $in: bookIds } });
        if (foundBooks.length !== books.length) {
            return res.status(404).json({ message: 'Some books are not found in inventory.' });
        }

        // Create and save the order
        const newOrder = new Order({ customerName, customerEmail, books });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders with optional filters
exports.getOrders = async (req, res) => {
    const { customerName, status, startDate, endDate } = req.query;
    let query = {};

    if (customerName) query.customerName = { $regex: customerName, $options: 'i' };
    if (status) query.status = status;
    if (startDate || endDate) {
        query.orderDate = {
            ...(startDate ? { $gte: new Date(startDate) } : {}),
            ...(endDate ? { $lte: new Date(endDate) } : {}),
        };
    }

    try {
        const orders = await Order.find(query).populate('books.bookId', 'title author price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status, books } = req.body;

    try {
        const updatedFields = {};
        if (status) updatedFields.status = status;
        if (books) {
            // Validate if all books exist
            const bookIds = books.map((book) => book.bookId);
            const foundBooks = await Book.find({ _id: { $in: bookIds } });
            if (foundBooks.length !== books.length) {
                return res.status(404).json({ message: 'Some books are not found in inventory.' });
            }
            updatedFields.books = books;
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, updatedFields, { new: true }).populate(
            'books.bookId',
            'title author price'
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
