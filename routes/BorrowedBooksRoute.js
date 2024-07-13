/**
 * @swagger
 * /api/v1/borrowing:
 *   get:
 *     summary: 
 *     description: 
 *     tags:
 *       - Borrowed Books
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/v1/borrowing/create:
 *   post:
 *     tags:
 *       - Borrowed Books
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
 *             example:
 *               code: "RF-18"
 *               title: "The Dragon Republic"
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
 * /api/v1/return/book_returns:
 *   post:
 *     tags:
 *       - Borrowed Books
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
 *               borrowe_return_date:
 *                 type: date
 *             example:
 *               code: "RF-18"
 *               title: "The Dragon Republic"
 *               borrower_return_date: "2024-07-18"
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */


import express from "express";
import { getBorrowedBooks, createBorrowedBooks, bookReturn } from "../controllers/BorrowedBooks.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/api/v1/borrowing', verifyToken, getBorrowedBooks);
router.post('/api/v1/borrowing/create', verifyToken, createBorrowedBooks);
router.post('/api/v1/return/book_returns', verifyToken, bookReturn);

export default router;