import express from "express";

import { getPeminjamans, createPinjam, pengembalian } from "../controllers/Peminjaman.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/peminjaman', verifyToken, getPeminjamans);
router.post('/peminjaman/create', verifyToken, createPinjam);
router.post('/pengembalian', verifyToken, pengembalian);

export default router;