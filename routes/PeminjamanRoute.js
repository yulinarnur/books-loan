import express from "express";

import { getPeminjamans, createPinjam } from "../controllers/Peminjaman.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/peminjaman', verifyToken, getPeminjamans);
router.post('/peminjaman/create', verifyToken, createPinjam);

export default router;