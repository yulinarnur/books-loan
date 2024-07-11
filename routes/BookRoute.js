import express from "express";

import { getBooks } from "../controllers/Books.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/books', verifyToken, getBooks);

export default router;