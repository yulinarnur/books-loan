/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: 
 *     description: 
 *     tags:
 *       - Book
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: 
 *     description: 
 *     tags:
 *       - Book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 description:
 *                   type: string
 *             example:
 *               id: 1
 *               title: "Sample Book"
 *               author: "John Doe"
 *               description: "A sample book"
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/books/create:
 *   post:
 *     tags:
 *       - Book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *             example:
 *               code: "PK-91"
 *               title: "Six of Crows"
 *               author: "Leigh Bardugo"
 *               stock: 5
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/books/update/{id}:
 *   put:
 *     tags:
 *       - Book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *             example:
 *               code: "PK-91"
 *               title: "Six of Crows"
 *               author: "Leigh Bardugo"
 *               stock: 5
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/books/delete/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

import express from "express";

import { getBooks, createBook, getBooksById, updateBook, deleteBook } from "../controllers/Books.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/api/v1/books', verifyToken, getBooks);
router.get('/api/v1/books/:id', verifyToken, getBooksById);
router.post('/api/v1/books/create', verifyToken, createBook);
router.put('/api/v1/books/update/:id', verifyToken, updateBook);
router.delete('/api/v1/books/delete/:id', verifyToken, deleteBook);


export default router;