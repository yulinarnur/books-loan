import express from "express";

import { getBorrowedBooks, createBorrowedBooks, bookReturn } from "../controllers/BorrowedBooks.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/borrowing', verifyToken, getBorrowedBooks);
router.post('/borrowing/create', verifyToken, createBorrowedBooks);
router.post('/book_returns', verifyToken, bookReturn);

export default router;