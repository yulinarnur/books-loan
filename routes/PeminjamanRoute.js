import express from "express";

import { getPeminjamans } from "../controllers/Peminjaman.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/peminjamans', verifyToken, getPeminjamans);

export default router;