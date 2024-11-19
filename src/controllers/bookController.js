const Book = require('../models/bookModel');

exports.createBook = async (req, res) => {
    try {
        const { title, author, genre, ISBN, price } = req.body;
        const newBook = new Book({ title, author, genre, ISBN, price });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getBooks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, genre, author, minPrice, maxPrice, search } = req.query;

        const query = {};
        if (genre) query.genre = genre;
        if (author) query.author = author;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        const totalBooks = await Book.countDocuments(query);
        const books = await Book.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        
        res.status(200).json({
            totalBooks,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalBooks / limit),
            books,
        });
    } catch (error) {
        next(error);
    }
};



exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
