const express = require('express');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *                 example: "Fiction"
 *               ISBN:
 *                 type: string
 *                 description: The unique ISBN of the book
 *                 example: "978-3-16-148410-0"
 *               price:
 *                 type: number
 *                 description: The price of the book
 *                 example: 9.99
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 genre:
 *                   type: string
 *                   example: "Fiction"
 *                 ISBN:
 *                   type: string
 *                   example: "978-3-16-148410-0"
 *                 price:
 *                   type: number
 *                   example: 9.99
 *                 _id:
 *                   type: string
 *                   example: "609e1266e4b0f441c4a8b4d8"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-18T10:15:30.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-18T10:15:30.000Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid data provided"
 */
router.post("/", createBook);


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books with optional filters
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of books per page
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter books by genre
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter books with price greater than or equal to this value
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter books with price less than or equal to this value
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for books by title or description
 *     responses:
 *       200:
 *         description: A paginated list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBooks:
 *                   type: integer
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "The Great Gatsby"
 *                       author:
 *                         type: string
 *                         example: "F. Scott Fitzgerald"
 *                       genre:
 *                         type: string
 *                         example: "Fiction"
 *                       price:
 *                         type: number
 *                         example: 9.99
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message explaining the failure"
 */
router.get("/", getBooks);


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update details of an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 example: "Updated Book Title"
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: "Updated Author"
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *                 example: "Updated Genre"
 *               ISBN:
 *                 type: string
 *                 description: The unique ISBN of the book
 *                 example: "978-3-16-148410-0"
 *               price:
 *                 type: number
 *                 description: The price of the book
 *                 example: 15.99
 *     responses:
 *       200:
 *         description: Successfully updated the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "609e1266e4b0f441c4a8b4d8"
 *                 title:
 *                   type: string
 *                   example: "Updated Book Title"
 *                 author:
 *                   type: string
 *                   example: "Updated Author"
 *                 genre:
 *                   type: string
 *                   example: "Updated Genre"
 *                 ISBN:
 *                   type: string
 *                   example: "978-3-16-148410-0"
 *                 price:
 *                   type: number
 *                   example: 15.99
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-18T10:15:30.000Z"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid data provided"
 */
router.put("/:id", updateBook);


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message explaining the failure"
 */
router.delete("/:id", deleteBook);


module.exports = router;
