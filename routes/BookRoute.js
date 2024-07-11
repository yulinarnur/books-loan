import express from "express";

import { getBooks, createBook, getBooksById } from "../controllers/Books.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/books', verifyToken, getBooks);
router.get('/books/:id', verifyToken, getBooksById);
router.post('/books/create', verifyToken, createBook);

export default router;